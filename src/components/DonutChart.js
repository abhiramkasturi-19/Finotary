import React from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Circle, Text as SvgText } from 'react-native-svg';
import { lightColors, fonts } from '../theme/theme';
// Note: colors prop is passed in from the parent so DonutChart respects dark/light mode.

// Also export a helper so screens can show pct in their own legend
export function getSlicePcts(data = []) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return [];
  return data.map(d => ({ ...d, pct: Math.round((d.value / total) * 100) }));
}

export default function DonutChart({
  data = [],
  size = 220,
  strokeWidth = 44,
  centerLabel = '',
  centerAmount = '',
  centerAmountColor,
  currency = '₹',
  colors = lightColors,   // pass active theme colors so dark mode works
}) {
  const PADDING = 10;
  const svgSize = size + PADDING * 2;
  const cx      = svgSize / 2;
  const cy      = svgSize / 2;
  const r       = (size - strokeWidth) / 2;
  const circ    = 2 * Math.PI * r;
  const gap     = 0.07;

  const total = data.reduce((s, d) => s + d.value, 0);

  if (total === 0) {
    return (
      <View style={{ width: svgSize, height: svgSize, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.textMuted, fontSize: 13, fontFamily: fonts.regular }}>No expense data</Text>
      </View>
    );
  }

  let cursor = -Math.PI / 2;
const slices = data.map(d => {
  const fullSweep  = (d.value / total) * 2 * Math.PI;
  // Clamp so tiny slices (smaller than the gap) never go negative —
  // a negative strokeDasharray is invalid SVG and can render as a
  // full solid circle, painting over every other slice.
  const arcSweep   = Math.max(fullSweep - gap, fullSweep * 0.5);
  const startAngle = cursor + gap / 2;
  cursor += fullSweep;
  return {
    ...d,
    startAngle,
    sweep: arcSweep,
    pct: Math.round((d.value / total) * 100),
  };
});

  const degOf = (rad) => (rad * 180) / Math.PI;

  return (
    <View style={{ width: svgSize, height: svgSize, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={svgSize} height={svgSize}>
        {slices.map((sl, i) => {
          const arcLen  = sl.sweep * r;
          const gapLen  = circ - arcLen;
          const rotateDeg = degOf(sl.startAngle) + 90;

          return (
            <G key={i} rotation={rotateDeg} origin={`${cx},${cy}`}>
              <Circle
                cx={cx} cy={cy} r={r}
                stroke={sl.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${arcLen} ${gapLen}`}
                strokeLinecap="round"
              />
            </G>
          );
        })}

        {/* Center label */}
        {centerLabel !== '' && (
          <SvgText x={cx} y={cy - 12} textAnchor="middle" fontSize={11} fill={colors.textMuted} fontFamily={fonts.regular}>
            {centerLabel}
          </SvgText>
        )}

        {/* Center amount */}
        {centerAmount !== '' && (
          <SvgText 
            x={cx} 
            y={centerLabel !== '' ? cy + 14 : cy + 10} 
            textAnchor="middle" 
            fontSize={centerLabel !== '' ? 18 : 20} 
            fontFamily={fonts.heavy} 
            fill={centerAmountColor || colors.textPrimary}
          >
            {centerAmount}
          </SvgText>
        )}

        {centerAmount === '' && (
          <>
            <SvgText x={cx} y={cy - 6} textAnchor="middle" fontSize={26} fontFamily={fonts.heavy} fill={colors.textPrimary}>
              {slices.length > 0 ? `${slices.reduce((a, b) => a.pct > b.pct ? a : b).pct}%` : ''}
            </SvgText>
            <SvgText x={cx} y={cy + 18} textAnchor="middle" fontSize={12} fill={colors.textMuted} fontFamily={fonts.regular}>
              {slices.length > 0 ? slices.reduce((a, b) => a.pct > b.pct ? a : b).label : ''}
            </SvgText>
          </>
        )}
      </Svg>
    </View>
  );
}
