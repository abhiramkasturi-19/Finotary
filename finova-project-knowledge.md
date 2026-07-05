# Finova — Complete Project Knowledge Base
## Full Development Log, Architecture Reference & Agent Context Document

> **Who should read this:** Any AI agent, developer, or collaborator picking up this project. This document contains the complete history of every decision, every error, every fix, every design change, and the exact current state of every file. Read this fully before making any changes.

---

## TABLE OF CONTENTS

1. Project Overview
2. Tech Stack & Dependencies
3. File Structure
4. Design References & Visual Direction
5. Color Palettes
6. Font System — FUNGIS
7. Icon System
8. Data Models
9. Categories Reference
10. Screen Specifications (detailed)
11. AppContext — State Management
12. Theme Pattern — Critical Rules
13. App.js Architecture
14. Navigation Structure
15. Encryption
16. Spacing & Status Bar Rules
17. SafeAreaView Warning
18. All Errors & Fixes
19. Full Change Log
20. Pro System — Architecture & Monetization
21. How to Run & Troubleshooting
22. Security & Robustness Notes
23. Critical Rules for Any Agent
24. Future Work

---

## 1. PROJECT OVERVIEW

**App Name:** Finova
**Type:** Personal Finance Management Mobile App
**Runtime:** Expo Go (dev) → EAS Build (production)
**Framework:** React Native via Expo SDK ~55
**Platform tested:** Android
**Developer OS:** Windows 11 | PowerShell
**Project location:** A:\ProgramLife\APP\Finova\

### Current App Version
**3.0.3 — Pro Persistence Fix + Demo Theme Fix + Demo Exit Symmetry + Keyboard Coverage Fix**

### Delivered Files (v3.0.3)

| File | Action | Destination |
|---|---|---|
| App.js | Replace | App.js (root) |
| AppContext.js | Replace | src/context/AppContext.js |
| SettingsScreen.js | Replace | src/screens/SettingsScreen.js |
| LoginScreen.js | Replace | src/screens/LoginScreen.js |
| app.json | Replace | app.json (root) |

### Previously Delivered Files (v3.0.3, still current)

| File | Destination |
|---|---|
| demoData.js | src/data/demoData.js |
| ProPaywallScreen.js | src/screens/ProPaywallScreen.js |
| WalletsScreen.js | src/screens/WalletsScreen.js |
| ActivityScreen.js | src/screens/ActivityScreen.js |
| HomeScreen.js | src/screens/HomeScreen.js |
| StatsScreen.js | src/screens/StatsScreen.js |
| AddTransactionScreen.js | src/screens/AddTransactionScreen.js |

### Known Startup Fix
```bash
npx expo start --clear
```

---

## 2. TECH STACK & DEPENDENCIES

expo ~55.0.6, react 19.2.0, react-native 0.83.2, @react-navigation/native ^7.1.33, @react-navigation/native-stack ^7.14.5, react-native-screens ~4.23.0, react-native-safe-area-context ~5.6.2, @react-native-async-storage/async-storage 2.2.0, react-native-svg 15.15.3, expo-image-picker, expo-document-picker, expo-file-system, expo-sharing, expo-font ~13.0.3, expo-splash-screen ~0.29.22

> WARNING: expo-image-manipulator permanently removed. Do NOT add back.
> WARNING: react-native-purchases NOT installed. Purchase flow is TEST MODE.
> WARNING: expo-local-authentication NOT installed. App Lock is PIN-only.

---

## 3. FILE STRUCTURE

```
App.js                           ← Root: navigation, AppLockOverlay, DemoBanner, CustomTabBar
src/context/AppContext.js        ← All state, reducers, actions, demo mode
src/data/categories.js           ← EXPENSE_CATEGORIES, INCOME_CATEGORIES, getCat()
src/data/demoData.js             ← DEMO_DATA export (2 years sample, expanded to Dec 2026)
src/screens/WelcomeScreen.js
src/screens/CreateAccountScreen.js
src/screens/DataInfoScreen.js
src/screens/LoginScreen.js
src/screens/AppGuideScreen.js
src/screens/HomeScreen.js
src/screens/ActivityScreen.js
src/screens/StatsScreen.js
src/screens/SettingsScreen.js
src/screens/AddTransactionScreen.js
src/screens/ProPaywallScreen.js
src/screens/WalletsScreen.js
src/components/Icon.js
src/theme/theme.js
```

---

## 5. COLOR PALETTES

### Light Theme — Parchment & Sage
bg:#F6F0D7, surface:#FDFAF0, surface2:#EDE8CE, accent:#9CAB84, accentLight:#7A8B68, accentDark:#89986D, textPrimary:#2C3320, textMuted:#7A8B68, wineRed:#8B3A3A, expense:#8B3A3A, income:#4A6741, border:#DDD9C2

### Dark Theme — Designer Modern
bg:#222629, surface:#474B47, surface2:#6B6E70, accent:#AEB784, accentLight:#AEB784, accentDark:#61892F, textPrimary:#FFFFFF, textMuted:#6B6E70, wineRed:#B07070, expense:#B07070, income:#AEB784, border:rgba(107,110,112,0.3)

### Fixed Screens (not theme-dependent)
- ProPaywall bg: #090A09 (deep black — NOT #1A1D1A)
- AppLock bg: #1A1D1A
- Onboarding overlay: rgba(0,0,0,0.90)
- Modal sheet: #2C3020
- Demo banner: backgroundColor #AEB784, button bg #222629

---

## 6. FONT SYSTEM — FUNGIS

Always Fungis-Regular, Fungis-Bold, Fungis-Heavy. NEVER FUNGIS-* (causes silent fallback to system font).

---

## 9. CATEGORIES REFERENCE

### Expense (src/data/categories.js)
food #ECA72C | petrol #B10F2E | shopping #9984D4 | books #EDE580 | transport #B3C0A4 | health #98CE00 | bills #3993DD | others #221E22

### Income (src/data/categories.js)
salary #A3BFA8 | freelance #9984D4 | gift #ECA72C | others #3993DD

CRITICAL: Transaction category field MUST be lowercase id (food, bills, transport) — NEVER title case label (Food, Bills). getCat() matches by id. Title case causes fallback to others → one colour donut, wrong emoji.

Custom: 25-colour DESIGNER_PALETTE in AppContext. Free: max 3. Pro: unlimited.

---

## 10. SCREEN SPECIFICATIONS

### 10.1 WelcomeScreen
Root. Get Started → CreateAccount. Log In → Login. No back button.

### 10.2 LoginScreen *(updated v3.0.6)*
JSON backup → validate → importData() → hasOnboarded:'true' → reset to Main.
Auto-detects FINOVA_ENC: or FINOVA_ENC2: prefix → DecryptImportModal.

**DecryptImportModal keyboard fix (v3.0.6):**
The `DecryptImportModal` password `TextInput` is wrapped in `KeyboardAvoidingView` with `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}`. Outer container uses `justifyContent:'flex-end'` and `marginBottom:40` so the input floats above the keyboard. `softwareKeyboardLayoutMode:'pan'` in `app.json` provides the base Android fix.

### 10.3 CreateAccountScreen
Profile pic (allowsEditing:true, aspect:[1,1], NO ImageManipulator), username, age, theme chip, currency chip, terms checkbox.
TermsModal: 6 sections, "Last updated March 2026". I Understand does NOT auto-tick.
SafeAreaView paddingTop:-50 paddingBottom:-100. Always dark.

### 10.4 DataInfoScreen
"Enter Finova →" → hasOnboarded:'true' → reset to Main.

### 10.5 AppGuideScreen
panDownManual. Internal Animated.View spring slide-up. stiffness:240, damping:26. Immediate goBack() on close.

### 10.6 SettingsScreen *(updated v3.0.6)*
**File:** `src/screens/SettingsScreen.js`

Profile card view mode shows **👑 PRO badge** if `isPro`. Active wallet name shown below meta line (if not default wallet).

**PREFERENCES section:**
- Dark Mode toggle (unchanged)
- App Lock toggle — Pro-gated. If not Pro → navigates to ProPaywall. If Pro + toggled ON → opens `PinSetupModal`.

**PinSetupModal keyboard fix (v3.0.6):**
Modal content is vertically centred (`justifyContent:'center'`). Hidden autofocus `TextInput` for PIN capture uses `style={{ position:'absolute', opacity:0, height:0 }}`. Modal inner container has `paddingBottom:300` to ensure scroll room when keyboard opens. `softwareKeyboardLayoutMode:'pan'` in `app.json` handles the base Android behaviour.

**DATA MANAGEMENT section (collapsible):**
- **Try Demo / Exit Demo** — same row, conditional on `isDemoMode` (v3.0.6):
  - When `isDemoMode === false`: shows "Try Demo" (👀) row — loads `DEMO_DATA`
  - When `isDemoMode === true`: shows "Exit Demo" (🚪) row — calls `exitDemo()`
  - The `DemoBanner` Exit button in App.js remains as a persistent secondary exit available from any screen
- Download Data — Pro-gated (JSON backup)
- CSV Export — Pro feature
- Passcode Export — Pro feature
- Upload Data — always available
- Clear All Data — always available. Custom modal confirm.

**APP section:**
- Wallets row → navigates to `WalletsScreen`
- App Guide row → navigates to `AppGuide`
- "👑 Upgrade to Pro" row — visible only to free users

**executeClear** preserves: `name`, `age`, `currency`, `darkMode`, `profileImage`, `isPro`, `appLockEnabled`, `appLockPin`, `wallets`, `activeWalletId`, `customCategories`, `hasOnboarded`.
Uses `AsyncStorage.setItem` — **never** `AsyncStorage.clear()`.

**Logout Options:**
`LogoutModal` renders 2 explicit paths. Free users interacting with the Download option are routed to ProPaywall.

### 10.7 AddTransactionScreen *(v3.0)*
panDownManual. Own Animated.View spring slide-up. stiffness:240. Immediate goBack() on close. maxLength={12}. paddingBottom:120. **No KAV — Rule 26.**
Custom category gate: checks return value of addCustomCategory. 'limit_reached' → ErrorModal with ProPaywall action. 'demo_mode' → silently ignored.
Wallet tagging automatic — addTransaction() tags with activeWalletId.
Date validation: validates .getDate/.getMonth/.getFullYear match to catch Feb 31 rollover.

### 10.8 HomeScreen *(v3.0)*
Uses `activeTransactions` (wallet-filtered). Wallet name pill on card top row (→ WalletsScreen). Avatar tap → WalletsScreen. Balance Text: `adjustsFontSizeToFit` + `numberOfLines={1}`.

### 10.9 ActivityScreen *(v3.0)*
Uses `activeTransactions`. Calendar heat-map wallet-aware. Heat intensity thresholds: <500 light, <2000 medium, <5000 bright, ≥5000 full. Transaction Search Pro-gated.

### 10.10 StatsScreen *(v3.0)*
Uses `activeTransactions`. Filters: Week/Month/3 Month/6 Month/Year. Month view label step: n <= 31 ? 2 : Math.max(1, Math.ceil(n/10)).

### 10.11 ProPaywallScreen *(v3.0.2)*
Background: #090A09. panDownManual. Own Animated.View spring. stiffness:240. TEST MODE: 900ms delay → updatePro(true) → goBack(). Immediate goBack() on close.

### 10.12 WalletsScreen *(v3.0.3)*
**panDownManual — NO internal Animated.View.** The preset handles all animation. Adding one causes double-animation conflict. Immediate goBack() on close.
walletToDelete and setWalletToDelete MUST be useState(null). Default wallet (id:'default') cannot be deleted or archived. Delete migrates transactions to 'default'. Pro-gated wallet creation.

### 10.13 Demo Mode *(v3.0.6 — theme + exit fixes)*
Activated: Settings → DATA MANAGEMENT → Try Demo.
Loads DEMO_DATA from src/data/demoData.js. isDemoMode:true. _realStateSnapshot saved. ALL writes silently blocked EXCEPT darkMode toggle. AsyncStorage NEVER written.

**Theme in demo (v3.0.6 fix):** Demo loads with the user's real `darkMode` preference, not `DEMO_DATA.settings.darkMode`. `LOAD_DEMO` reducer explicitly copies `state.settings.darkMode` into the demo state. `toggleDarkMode()` / `UPDATE_SETTINGS` with only `darkMode` key is unblocked in demo — all other settings writes remain blocked.

**Exit options (v3.0.6):**
1. DemoBanner "Exit" button — always visible at top of every screen during demo
2. Settings → DATA MANAGEMENT → "Exit Demo" row — same location as "Try Demo"

Exit restores _realStateSnapshot (real theme, isPro, wallets, settings, transactions).
AppLock does NOT trigger in demo. DemoBanner height: DEMO_BANNER_HEIGHT = 74.
AppLockOverlay wraps {children} in View with marginTop: isDemoMode ? DEMO_BANNER_HEIGHT : 0.

---

## 11. APPCONTEXT — STATE MANAGEMENT

**File:** `src/context/AppContext.js` | **Hook:** `useApp()`

### State Shape *(v3.0.2)*
```js
{
  transactions: [],
  settings: {
    name:           '',
    age:            '',
    currency:       '₹',
    darkMode:       false,
    profileImage:   '',
    isPro:          false,
    appLockEnabled: false,
    appLockPin:     '',
  },
  customCategories: { expense: [], income: [] },
  wallets: [{ id: 'default', name: 'Personal', icon: '💳', archived: false }],
  activeWalletId:     'default',
  isDemoMode:         false,
  _realStateSnapshot: null,
}
```

### Persist useEffect — CRITICAL RULE (v3.0.6)
```js
useEffect(() => {
  // NEVER persist during demo mode — demo data must never overwrite real user data
  if (state.isDemoMode) return;
  AsyncStorage.setItem('@flo_data', JSON.stringify(state)).catch(() => {});
}, [state]);
```
The `isDemoMode` guard is non-negotiable. Without it, demo state overwrites real Pro status and transactions.

### LOAD_DEMO reducer — CRITICAL RULE (v3.0.6)
```js
case 'LOAD_DEMO': {
  const snapshot = {
    transactions:     state.transactions,
    settings:         { ...state.settings },   // includes isPro, darkMode, everything
    customCategories: state.customCategories,
    wallets:          state.wallets,
    activeWalletId:   state.activeWalletId,
  };
  return {
    ...action.payload,              // DEMO_DATA
    settings: {
      ...action.payload.settings,
      darkMode: state.settings.darkMode,  // preserve user's real theme
    },
    isDemoMode:         true,
    _realStateSnapshot: snapshot,
  };
}
```

### EXIT_DEMO reducer — CRITICAL RULE (v3.0.6)
```js
case 'EXIT_DEMO': {
  const snapshot = state._realStateSnapshot;
  if (!snapshot) return { ...initialState, isDemoMode: false };
  return {
    ...snapshot,          // full real state restoration
    isDemoMode:         false,
    _realStateSnapshot: null,
  };
}
```
NEVER return initialState if snapshot exists — this wipes real Pro status.

### UPDATE_SETTINGS in demo — darkMode exception (v3.0.6)
```js
case 'UPDATE_SETTINGS': {
  if (state.isDemoMode) {
    // Allow darkMode toggle only — block everything else
    if (Object.keys(action.payload).length === 1 && 'darkMode' in action.payload) {
      return { ...state, settings: { ...state.settings, darkMode: action.payload.darkMode } };
    }
    return state;
  }
  return { ...state, settings: { ...state.settings, ...action.payload } };
}
```

### LOAD_DATA — isPro security rule
`LOAD_DATA` (used by importData / backup restore) MUST strip `isPro`, `appLockEnabled`, `appLockPin` from the incoming payload to prevent privilege injection via backup file. It reads these correctly from `@flo_data` on startup — the stripping applies only to the importData() flow.

### Key Actions *(v3.0.2)*
| Method | Purpose | Notes |
|---|---|---|
| `addTransaction(txn)` | Prepends with id + walletId | Blocked in demo |
| `editTransaction(txn)` | map() replaces by id | Blocked in demo |
| `deleteTransaction(id)` | Filter by id | Blocked in demo |
| `updateSettings(partial)` | Merges settings | Blocked in demo EXCEPT darkMode |
| `updatePro(bool)` | Sets settings.isPro | Blocked in demo |
| `toggleDarkMode()` | Shorthand | Allowed in demo (v3.0.6) |
| `addCustomCategory(type, name)` | Returns 'limit_reached', 'ok', 'demo_mode' | Free limit: 3 |
| `deleteCustomCategory(type, name)` | Filter | Blocked in demo |
| `addWallet(name, icon)` | Returns 'requires_pro', 'ok', 'demo_mode' | Pro-gated |
| `renameWallet(id, name)` | Updates wallet name | Blocked in demo |
| `deleteWallet(id)` | Removes wallet, migrates txns to 'default' | Cannot delete 'default' |
| `archiveWallet(id)` | Sets archived:true | Cannot archive 'default' |
| `unarchiveWallet(id)` | Sets archived:false | Blocked in demo |
| `switchWallet(id)` | Updates activeWalletId | Blocked in demo |
| `importData(data)` | Full LOAD_DATA replace | strips isPro/appLock |
| `enterDemo()` | Dispatches LOAD_DEMO | |
| `exitDemo()` | Dispatches EXIT_DEMO, restores snapshot | |

### isPro & App Lock persistence *(clarified v3.0.6)*
- `isPro`, `appLockEnabled`, `appLockPin` are in `settings` → persisted in `@flo_data`
- Survive: `executeClear` ✅, app background/foreground ✅, app restart ✅
- **Persist useEffect skips when `isDemoMode:true`** — real state (including isPro) remains unchanged in storage while demo runs
- Cleared by: `performLogout` only

### Context value
```js
value={{
  ...state,
  activeTransactions,
  isPro: state.settings.isPro,
  isDemoMode: state.isDemoMode,
  // all actions...
}}
```

---

## 13. APP.JS ARCHITECTURE

### Components in App.js
| Component | Purpose |
|---|---|
| `DemoBanner` | Green bar, position:absolute, zIndex:999. "👀 Demo Mode — read only" + Exit button. Height = DEMO_BANNER_HEIGHT (74px). Renders only when isDemoMode:true. |
| `AppLockOverlay` | Wraps entire NavigationContainer. AppState watcher. PIN modal bg #1A1D1A. Skips lock when isDemoMode:true. Wraps {children} in View with marginTop: isDemoMode ? DEMO_BANNER_HEIGHT : 0. |
| `CustomTabBar` | Custom bottom tab bar. elevation:100. Inactive: display:'none'. |
| `MainTabs` | Custom tab switcher with directional spring animation. |
| `AuthFlow` | Onboarding screens with spring slide animation. |
| `BrandedSplash` | 2s branded splash on every cold launch. Holds 1.4s, fades + scales out 0.6s. |

### Transition Presets *(v3.0)*
```js
const DARK          = { contentStyle: { backgroundColor: '#111' } };
const panDownManual = { presentation:'transparentModal', animation:'none', ...DARK };
const slideRight    = { animation:'slide_from_right', animationDuration:250, gestureEnabled:true, gestureDirection:'horizontal', ...DARK };
const fadeIn        = { animation:'fade', animationDuration:280, ...DARK };
const noAnim        = { animation:'none', ...DARK };
```

### Screen → Preset mapping *(v3.0.3 — current)*
| Screen | Preset | Internal animation |
|---|---|---|
| Welcome (AuthFlow) | noAnim | spring (internal) |
| Main (MainTabs) | fadeIn | directional spring (internal) |
| AddTransaction | panDownManual | spring slide-up, stiffness:240 |
| AppGuide | panDownManual | spring slide-up, stiffness:240 |
| ProPaywall | panDownManual | spring slide-up, stiffness:240 |
| Wallets | panDownManual | **NONE** — preset handles all animation |

### DEMO_BANNER_HEIGHT
```js
export const DEMO_BANNER_HEIGHT = 74;
```
Exported from App.js. Single source of truth. AppLockOverlay applies the offset. Never add per-screen padding to compensate.

### AppLock AppState handler — demo guard
```js
// AppLockOverlay AppState change handler
if (isDemoMode) return;   // never trigger lock during demo
if (!settings.appLockEnabled || !settings.appLockPin) return;
setLocked(true);
```

---

## 14. NAVIGATION STRUCTURE

### Key flows *(v3.0)*
```
Free user hits custom cat limit:
  AddTransactionScreen → 'limit_reached' → ErrorModal → ProPaywall

Free user taps search in Activity:
  → ProPaywall

Free user taps App Lock toggle:
  → ProPaywall

Free user taps New Wallet:
  → ProPaywall

Wallet switch:
  WalletsScreen tap → switchWallet(id) → goBack() → all screens reflect new wallet

Demo enter:
  Settings → Try Demo → LOAD_DEMO → isDemoMode:true → DemoBanner appears

Demo exit (two paths):
  1. DemoBanner "Exit" button (any screen)
  2. Settings → DATA MANAGEMENT → "Exit Demo" row
  Both call exitDemo() → EXIT_DEMO → _realStateSnapshot restored
```

---

## 15. ENCRYPTION (Passcode Export)

XOR encryption — FINOVA_ENC2: format: salt + hash-derived key + positional shift. Both v1 (FINOVA_ENC:) and v2 supported for decryption. Upload flow auto-detects prefix.

---

## 18. ALL ERRORS & FIXES

| Error | Cause | Fix |
|---|---|---|
| White/grey flash on modal | Native modal bg on Android | panDownManual + internal Animated.View |
| Exit animation grey flash | Spring-down before goBack | Immediate goBack() — no exit spring |
| Note hidden behind keyboard | KAV broken inside Android modals | softwareKeyboardLayoutMode:'pan' in app.json |
| MediaTypeOptions crash | SDK 55 deprecated API | Omit mediaTypes entirely |
| darkColors.bg wrong | '#222222' not '#222629' | Fixed in theme.js |
| Activity delete used system Alert | Alert.alert not custom modal | DeleteTxnModal added |
| executeClear wiped hasOnboarded | AsyncStorage.clear() | Replaced with setItem('@flo_data',...) |
| HomeScreen taps did nothing | No onPress on TransactionItem | TouchableOpacity wrapping added |
| Stats pills overflow | Long labels | Shorter label |
| Amount overflow | No maxLength | maxLength={12} |
| AppGuide entry too slow | stiffness:24 typo | Fixed to stiffness:240 |
| [runtime not ready] EventEmitter | Stale Metro cache | npx expo start --clear |
| Invalid number formatting char 'z' | Malformed SVG path | Fixed arc parameters |
| CRITICAL Pro JSON Injection | LOAD_DATA overwrote isPro | Strip isPro from backup payload |
| CRITICAL App Lock Cold-Boot Bypass | AppState listener only on minimize | Added mount check to AppLockOverlay |
| HIGH O(N) Array Freeze | Mapping thousands in ScrollView | Sliced output to 100 |
| HIGH Weak XOR Encryption | Static passcodes | FINOVA_ENC2 salted-hash positional shift |
| MEDIUM CSV Wallet Isolation | walletId hardforced | parseCsvBackup builds wallets[] dynamically |
| MEDIUM Future Date Filter Leak | Negative diff | Bound check diff >= 0 && diff <= 7 |
| LOW Instant Modal Snap Dismount | goBack before spring | Wrapped in spring callback |
| Profile crop removed | allowsEditing:false | Restored allowsEditing:true, aspect:[1,1] |
| Demo categories "Others" / one colour donut | Title case in demo data | Lowercase ids in all demo transactions |
| Exit demo resets to light theme | EXIT_DEMO returned initialState | EXIT_DEMO restores _realStateSnapshot |
| Demo data bloated SettingsScreen | Inline DEMO_DATA | Extracted to src/data/demoData.js |
| Activity annual < quarter | Front-loaded transactions | Rebalanced across 27 months |
| Date rollover accepted (Feb 31) | JS Date silent rollover | handleSubmit validates getDate/getMonth/getFullYear |
| WalletsScreen wrong transition | slideRight instead of panDownManual | Changed to panDownManual in App.js |
| WalletsScreen double animation | Internal slideAnim conflicting | Removed internal Animated.View |
| WalletsScreen ReferenceError on delete | walletToDelete never declared | Added useState(null) for walletToDelete |
| HomeScreen balance overflow | Static fontSize:42 | adjustsFontSizeToFit + numberOfLines={1} |
| ProPaywall bg wrong | Documented as #1A1D1A | Corrected to #090A09 |
| Demo banner covering content | position:absolute overlaps nav | AppLockOverlay marginTop:DEMO_BANNER_HEIGHT |
| **Pro resets on app reopen** | Persist useEffect ran during demo, saving demo state (isPro:false) over real state | Added `if (state.isDemoMode) return` guard to persist useEffect |
| **Demo resets Pro on exit** | EXIT_DEMO returned initialState instead of snapshot | EXIT_DEMO now returns `{ ...snapshot, isDemoMode:false, _realStateSnapshot:null }` |
| **LOAD_DEMO lost real isPro** | Snapshot not saved before demo load | LOAD_DEMO now saves full state snapshot including isPro before loading demo |
| **Demo stuck in dark theme** | DEMO_DATA.settings.darkMode:true overrode user preference; toggleDarkMode blocked in demo | LOAD_DEMO preserves state.settings.darkMode; UPDATE_SETTINGS unblocks darkMode-only writes in demo |
| **No Exit Demo in Settings** | Exit only via DemoBanner; no symmetry with Try Demo location | Try Demo row replaced with conditional Try/Exit based on isDemoMode |
| **Keyboard covers PIN setup modal** | Modal content at bottom; keyboard not avoided | Modal content vertically centred; paddingBottom:300; softwareKeyboardLayoutMode:'pan' in app.json |
| **Keyboard covers Login decrypt input** | No KAV in DecryptImportModal | KAV + justifyContent:'flex-end' + marginBottom:40 added to DecryptImportModal |

---

## 19. FULL CHANGE LOG

| # | Change | Files |
|---|---|---|
| 49–135 | v2.6.0 through v2.8.0 | — |
| 136–170 | v2.9.0 through v3.0.2 (Pro System, App Lock, Wallets, Search, Demo Mode) | — |
| 171 | WalletsScreen transition changed from slideRight to panDownManual | App.js |
| 172 | WalletsScreen internal Animated.View removed | WalletsScreen.js |
| 173 | walletToDelete useState(null) added | WalletsScreen.js |
| 174 | HomeScreen balance adjustsFontSizeToFit + numberOfLines={1} | HomeScreen.js |
| 175 | ProPaywall bg corrected to #090A09 | ProPaywallScreen.js, KB |
| 176 | Demo banner offset: AppLockOverlay marginTop:DEMO_BANNER_HEIGHT | App.js |
| 177 | DEMO_BANNER_HEIGHT = 74 exported from App.js | App.js |
| 178 | demoData.js extracted to src/data/ | demoData.js |
| 179 | Demo transactions corrected to lowercase category ids | demoData.js |
| 180 | Demo data expanded to Dec 2026 | demoData.js |
| 181 | Monochrome icon specification added | KB, assets/ |
| 182 | **Persist useEffect isDemoMode guard added** — demo data never saved to AsyncStorage | AppContext.js |
| 183 | **LOAD_DEMO saves full state snapshot including isPro** | AppContext.js |
| 184 | **EXIT_DEMO restores _realStateSnapshot** — never returns initialState | AppContext.js |
| 185 | **LOAD_DEMO preserves real user darkMode** — demo loads in user's theme | AppContext.js |
| 186 | **UPDATE_SETTINGS unblocks darkMode-only writes in demo** | AppContext.js |
| 187 | **Try Demo / Exit Demo conditional row** in Settings DATA MANAGEMENT | SettingsScreen.js |
| 188 | **PinSetupModal keyboard fix** — vertically centred, paddingBottom:300 | SettingsScreen.js |
| 189 | **DecryptImportModal KAV fix** — KAV + justifyContent flex-end + marginBottom:40 | LoginScreen.js |
| 190 | **softwareKeyboardLayoutMode:'pan'** added to app.json android section | app.json |
| 191 | Version bumped to 3.0.6 | KB |

---

## 20. PRO SYSTEM — ARCHITECTURE & MONETIZATION

### Current State (TEST MODE)
`react-native-purchases` is NOT installed. Purchase flow is simulated: 900ms delay → `updatePro(true)` → `goBack()`. Do NOT ship to production without RevenueCat integration.

### RevenueCat Integration Plan (v3.1.0)
Play Console account created — in verification (May 2026). Cannot create in-app products until verification clears and at least one internal build is published.

**Planned integration order:**
1. Verification clears → EAS internal build → upload to Play Console internal track
2. Create in-app product `finova_pro_lifetime` at ₹199, type: non-consumable (or subscription)
3. RevenueCat dashboard: Create entitlement `pro`, product `finova_pro_lifetime`, offering `default`
4. Link RevenueCat to Play Console via Google Service Account JSON key
5. Install SDK: `npx expo install react-native-purchases react-native-purchases-ui`
6. Add plugin to app.json: `"plugins": ["react-native-purchases"]`
7. Replace TEST MODE purchase flow with RevenueCat SDK calls

### Pro Features
- Unlimited custom categories (Free: max 3)
- Transaction Search (Activity screen)
- App Lock (PIN)
- Multiple Wallets (create beyond default Personal)
- Download Data (JSON backup)
- CSV Export
- Passcode Export (encrypted backup)

---

## 21. HOW TO RUN & TROUBLESHOOTING

### Standard Run
```bash
npx expo start --clear
```
Always use `--clear` after dropping in new files — Metro cache causes EventEmitter crash otherwise.

### Testing Free Mode
Default: isPro:false. At 3 custom categories "+ New" shows "Pro" label. Search icon shows 🔒 badge. App Lock redirects to paywall.

### Testing Pro Mode
Tap "Unlock Finova Pro →" on paywall. isPro becomes true in 900ms. To reset: log out.

### Testing Demo Mode
Settings → DATA MANAGEMENT → Try Demo. 2-year dataset loads instantly. Renders in user's real theme. All writes blocked except darkMode toggle. Exit via DemoBanner OR Settings → DATA MANAGEMENT → Exit Demo.

### Testing App Lock
1. Settings → App Lock (requires Pro) → toggle ON → set 4-digit PIN
2. Background app → foreground → PIN overlay appears
3. Demo mode: App Lock never triggers

### Re-testing Onboarding
```js
await AsyncStorage.removeItem('hasOnboarded');
```

### 🛑 Pro Resets on Reopen
Ensure persist useEffect has `if (state.isDemoMode) return` guard. Ensure EXIT_DEMO restores snapshot not initialState.

### 🛑 Demo Resets Theme
Ensure LOAD_DEMO copies `state.settings.darkMode` into demo settings. Ensure UPDATE_SETTINGS allows darkMode-only writes in demo.

### 🛑 Keyboard Covers PIN / Login Input
Confirm `"softwareKeyboardLayoutMode":"pan"` is in app.json android section. Confirm PinSetupModal is vertically centred with paddingBottom:300. Confirm DecryptImportModal has KAV.

### 🛑 White / Grey Flash on Modal
All 4 modal screens use panDownManual. Do NOT switch to panDownModal.

### 🛑 Double Animation on WalletsScreen
Do NOT add internal Animated.View to WalletsScreen.

### 🛑 ReferenceError on Wallet Delete
walletToDelete and setWalletToDelete must be useState(null) in WalletsScreen.

### 🛑 Demo Banner Covering Content
Offset is in AppLockOverlay only. Never add per-screen padding.

---

## 22. SECURITY & ROBUSTNESS NOTES

### isPro security
Local AsyncStorage flag. LOAD_DATA strips isPro from backup payload — cannot be injected via backup file. RevenueCat receipt validation in v3.1.0.

### Demo Mode security
Never written to AsyncStorage. All writes are pure no-op except darkMode toggle (v3.0.6). No toast or error on blocked actions.

### App Lock security
PIN stored as plaintext in AsyncStorage. Convenience lock, not security guarantee. Cold-boot protected: fires on mount AND AppState. Fully bypassed in demo mode.

---

## 23. CRITICAL RULES FOR ANY AGENT

1. **Font keys: `Fungis-*`** — never `FUNGIS-*`.
2. **Asset path:** `../../assets/` from screens.
3. **Currency stored as symbol.**
4. **Hook is `useApp()`.**
5. **`hasOnboarded` flag survives executeClear.** Only logout clears it.
6. **No back button on WelcomeScreen.**
7. **`navigation.reset`** for onboarding exit and logout.
8. **`updateSettings`** for profile fields. **`updatePro(bool)`** for Pro status.
9. **Onboarding always dark.**
10. **All screens in both Stack branches.** Use sharedScreens pattern.
11. **No JSX comments inside navigator blocks.**
12. **`profileImage` is base64 data URI.**
13. **JSON backup contains everything** including isPro, wallets, activeWalletId.
14. **AddTransaction + AppGuide + ProPaywall + Wallets all use `panDownManual`.**
15. **Wallets uses `panDownManual`** — changed from slideRight in v3.0.3. Do NOT revert.
16. **No spring-down exit on any panDownManual screen** — immediate goBack() on all.
17. **Tab bar: `elevation:100`.** Inactive: `display:'none'`.
18. **Tab.Navigator NOT used** — MainTabs is custom.
19. **`contentStyle:{backgroundColor:'#111'}` on all stack screens.**
20. **Never `Alert.alert()` for destructive actions** — use custom modals.
21. **Modal sheet: `#2C3020`. AppLock bg: `#1A1D1A`. ProPaywall bg: `#090A09`.**
22. **TermsModal "I Understand" does NOT auto-tick.**
23. **`executeClear` uses `AsyncStorage.setItem` NOT `AsyncStorage.clear()`.**
24. **`executeClear` preserves `customCategories`, `isPro`, `appLockEnabled`, `appLockPin`, `wallets`, `activeWalletId`.**
25. **Creator credit always visible.**
26. **Never add KAV to AddTransactionScreen.**
27. **Never use `ImagePicker.MediaTypeOptions`.**
28. **Profile picture picker: `allowsEditing:true, aspect:[1,1]`.**
29. **`darkColors.bg` is `'#222629'`.**
30. **HomeScreen rows are tappable** — TouchableOpacity wrapping.
31. **Stats filters: `['Week','Month','3 Month','6 Month','Year']`.**
32. **Version is `3.0.6`.**
33. **Negative SafeAreaView padding is intentional** — `paddingTop:-50`, `paddingBottom:-100`.
34. **AddTransaction, AppGuide, ProPaywall spring stiffness is `240`, damping `26`.**
35. **WalletsScreen uses `panDownManual`** — NO internal Animated.View.
36. **`addCustomCategory` returns `'limit_reached'`, `'ok'`, or `'demo_mode'`.**
37. **`addWallet` returns `'requires_pro'`, `'ok'`, or `'demo_mode'`.**
38. **`isPro: false` is free mode. `isPro: true` is Pro.**
39. **ProPaywall is TEST MODE** — do NOT ship without RevenueCat.
40. **`react-native-purchases` is NOT yet installed.**
41. **`activeTransactions` is the wallet-filtered list.** Use in all display screens.
42. **`walletId` is auto-tagged on `addTransaction`.**
43. **Default wallet `id:'default'` cannot be deleted or archived.**
44. **Delete wallet migrates its transactions to `'default'`.**
45. **Always run `npx expo start --clear` after dropping in new files.**
46. **Terms & Conditions must include "Last updated March 2026".**
47. **No OS Alerts** — use MessageModal or RestoreConfirmModal.
48. **`walletToDelete` and `setWalletToDelete` MUST be `useState(null)` in WalletsScreen.**
49. **HomeScreen balance `Text` MUST have `adjustsFontSizeToFit` and `numberOfLines={1}`.**
50. **Demo mode writes are ALL silently blocked** — except darkMode toggle (v3.0.6).
51. **Demo data NEVER persists to AsyncStorage** — persist useEffect skips when `isDemoMode:true`.
52. **`EXIT_DEMO` restores `_realStateSnapshot`** — never returns initialState if snapshot exists.
53. **Demo transaction `category` field uses lowercase ids** — never title case labels.
54. **`demoData.js` lives in `src/data/`.**
55. **`DEMO_BANNER_HEIGHT = 74`** (exported from App.js). Never add per-screen padding.
56. **`performLogout` MUST use `removeItem('@flo_data')` + `removeItem('hasOnboarded')`** — NEVER `AsyncStorage.clear()`.
57. **Activity heatmap thresholds:** <500 light, <2000 medium, <5000 bright, ≥5000 full.
58. **`+ New` chip Pro Gate enforced in `onPress`** — check isPro && cats.length >= 3.
59. **Monochrome Icon:** transparent PNG, single colour, 108x108px (72x72px safe zone).
60. **Persist useEffect MUST have `if (state.isDemoMode) return` guard** — demo data must never overwrite real state in AsyncStorage. (v3.0.6)
61. **LOAD_DEMO MUST preserve `state.settings.darkMode`** — demo renders in user's real theme. (v3.0.6)
62. **EXIT_DEMO MUST return full `_realStateSnapshot`** — never initialState. (v3.0.6)
63. **UPDATE_SETTINGS in demo: unblock darkMode-only writes** — all other settings remain blocked. (v3.0.6)
64. **Settings Try Demo / Exit Demo is a single conditional row** — same location, same section, switches based on isDemoMode. (v3.0.6)
65. **`softwareKeyboardLayoutMode:'pan'` MUST be in `app.json` android section** — base fix for all keyboard coverage issues. (v3.0.6)
66. **PinSetupModal: vertically centred, paddingBottom:300** — keyboard must not cover PIN dots. (v3.0.6)
67. **DecryptImportModal in LoginScreen: KAV + justifyContent flex-end + marginBottom:40** — keyboard must not cover password input. (v3.0.6)

---

## 24. FUTURE WORK

| Feature | Version | Notes |
|---|---|---|
| RevenueCat integration | v3.1.0 | Replace TEST MODE. Awaiting Play Console verification + first build upload. |
| App Lock biometrics | v3.1.0 | expo-local-authentication |
| Secure PIN storage | v3.1.0 | expo-secure-store |
| DonutChart interactive segments | v3.1.0 | onSegmentPress on SVG arcs |
| Backup checksum | v3.1.0 | Version + hash |
| Cross-wallet Stats view | v3.1.0 | Toggle in StatsScreen |
| Demo onboarding entry | v3.1.0 | Try Demo on WelcomeScreen |
| AppGuide footnote update | v3.0.x | Update version reference |

---

*Last updated: May 12, 2026*
*Version: 3.0.6 — Pro Persistence Fix + Demo Theme Fix + Demo Exit Symmetry + Keyboard Coverage Fix*
*Developer: Abhiram Kasturi*
