# Finotary v1.0.1 — Deep QA & Exhaustive Bug Hunt Prompt
## Run this MULTIPLE TIMES across FREE mode, PRO mode, and DEMO mode

---

> **How to use:** Attach this file + ALL source files + the project knowledge base to a new agent chat. Run the full test 3 times: once in FREE mode, once in PRO mode, once in DEMO mode. For every failure report: exact file → exact function → exact line → exact code fix.

---

*You are a senior React Native QA engineer and UI/UX specialist. Your job is to exhaustively test every pixel, every function, every edge case, and every flow in Finotary v1.0.1. No detail is too small. Test the app three times in three modes: FREE, PRO, DEMO. For every single test item below, report PASS, FAIL, or BUG with full detail. If it fails, give the exact file, exact function name, and exact fix.*

---

## RUN 1 — TEST MODE

---

### F1. APP STARTUP & SPLASH
- [ ] Splash screen shows and hides cleanly — no white flash after hide
- [ ] Fonts load: Fungis-Regular, Fungis-Bold, Fungis-Heavy — no system font fallback visible anywhere
- [ ] `darkColors.bg` is exactly `#222629` — not `#222222` or any other value
- [ ] App opens to WelcomeScreen on first install (hasOnboarded not set)
- [ ] App opens to Main (HomeScreen) if hasOnboarded is set
- [ ] No `[runtime not ready] EventEmitter` crash on startup
- [ ] Status bar visible and correct colour on all screens

---

### F2. WELCOME SCREEN
- [ ] "Get Started" and "Log In" buttons both visible
- [ ] No back button / hardware back does nothing on WelcomeScreen
- [ ] Background image renders correctly
- [ ] Screen is always dark — never reads darkMode setting
- [ ] "Get Started" → slides right to CreateAccountScreen
- [ ] "Log In" → slides right to LoginScreen
- [ ] Both transitions are smooth spring slides, no flash

---

### F3. CREATE ACCOUNT SCREEN
- [ ] Profile picture picker opens correctly (no crop modal forced, 1:1 square crop, no ImageManipulator)
- [ ] Picked image shows as circular avatar preview
- [ ] Username text field accepts input, keyboard shows correctly
- [ ] Age field accepts only numbers, non-numeric input is blocked
- [ ] Theme chips (Dark / Light) both selectable, only one active at a time
- [ ] Currency chips (₹ $ € £) all selectable, only one active at a time
- [ ] Terms row renders on one line — link text visible
- [ ] Tapping terms link opens TermsModal
- [ ] TermsModal has exactly 6 sections
- [ ] TermsModal shows "Last updated March 2026" text
- [ ] "I Understand" button inside TermsModal does NOT auto-tick the checkbox
- [ ] Closing TermsModal without tapping "I Understand" leaves checkbox unticked
- [ ] "Get Started" button is disabled / cannot proceed without checkbox ticked
- [ ] SafeAreaView has `paddingTop:-50` and `paddingBottom:-100` (intentional negative padding)
- [ ] Screen is always dark — never reads darkMode setting
- [ ] Layout does not break on small screens

---

### F4. DATA INFO SCREEN
- [ ] "Enter Finotary →" button navigates to Main via `navigation.reset`
- [ ] After tapping, hasOnboarded is set to 'true'
- [ ] App reloads directly to Main on next launch
- [ ] Screen is always dark

---

### F5. LOGIN SCREEN
- [ ] Upload button opens document picker
- [ ] Uploading a valid .json backup → validates → imports data → resets to Main
- [ ] Uploading an .enc file → auto-detects FINOTARY_ENC: or FINOTARY_ENC2: prefix → opens DecryptImportModal
- [ ] DecryptImportModal: correct password → imports and goes to Main
- [ ] DecryptImportModal: wrong password → custom error modal shown (no native Alert.alert)
- [ ] Uploading invalid JSON → custom error modal (no native Alert.alert)
- [ ] After import, hasOnboarded is set to 'true'
- [ ] Screen is always dark

---

### F6. HOME SCREEN — FREE MODE
- [ ] Header shows current month and year correctly formatted
- [ ] Wallet pill shows "Personal" (default wallet name)
- [ ] Tapping wallet pill → navigates to WalletsScreen
- [ ] Avatar tap → navigates to WalletsScreen
- [ ] Income total shows correct sum for current month from activeTransactions
- [ ] Expense total shows correct sum for current month from activeTransactions
- [ ] Balance (income - expense) calculated correctly
- [ ] Donut chart renders with correct category breakdown — multiple colours, not one colour
- [ ] Donut chart uses activeTransactions (not raw transactions)
- [ ] Recent transactions list shows last 5 transactions from activeTransactions
- [ ] Each transaction row shows: emoji icon, category name, note/date, amount with correct colour
- [ ] Each transaction row is tappable (TouchableOpacity wrapping)
- [ ] Tapping a transaction row opens edit/detail view or modal
- [ ] Empty state shows "No transactions found for this month." message — no crash
- [ ] Light theme: bg exactly #F6F0D7, surface #FDFAF0, accent #9CAB84
- [ ] Dark theme: bg exactly #222629, surface #474B47, accent #AEB784
- [ ] Theme toggle in Settings instantly updates HomeScreen colours
- [ ] Tab bar visible, elevation:100, correct active tab highlight
- [ ] "+" add button in tab bar is tappable and opens AddTransactionScreen

---

### F7. ADD TRANSACTION SCREEN
- [ ] Screen slides up with spring animation — no white/grey flash on open
- [ ] Swipe down dismisses with immediate goBack() — no spring-down exit animation
- [ ] Income / Expense toggle works — switches between income and expense categories
- [ ] Amount field: numeric keyboard, maxLength=12 enforced
- [ ] Amount field: entering 0 or empty is blocked on save
- [ ] Category grid shows all 8 base expense categories with correct emoji + colour
- [ ] Category grid shows all base income categories when Income is selected
- [ ] Tapping a category selects it (highlighted)
- [ ] "+ New" chip visible at end of category list
- [ ] Tapping "+ New" in free mode (under 3 custom cats) → opens add category input
- [ ] Date field shows current date by default
- [ ] Date input validates — impossible dates like Feb 31 are rejected with error
- [ ] Date rollover (e.g. JS auto-corrects Mar 3 from Feb 31) is caught and blocked
- [ ] Note field accepts text, keyboard behaves correctly
- [ ] No KeyboardAvoidingView (KAV) anywhere in this screen
- [ ] "Save" button saves transaction → immediately visible in HomeScreen and ActivityScreen
- [ ] Saved transaction is auto-tagged with activeWalletId (Personal by default)
- [ ] After save, screen closes with immediate goBack() — no flash

---

### F8. FREE MODE PRO GATES — CUSTOM CATEGORIES
- [ ] Can add 1st custom category successfully
- [ ] Can add 2nd custom category successfully
- [ ] Can add 3rd custom category successfully
- [ ] At 3 categories, "+ New" chip label changes to "Pro" (not "New")
- [ ] Tapping "Pro" chip → opens ErrorModal with "👑 Upgrade to Pro" action button
- [ ] Tapping "Upgrade to Pro" in ErrorModal → navigates to ProPaywall
- [ ] addCustomCategory() returns 'limit_reached' — not 'ok' — at 4th attempt
- [ ] Custom categories appear in category grid for correct transaction type

---

### F9. ACTIVITY SCREEN — FREE MODE
- [ ] Calendar heatmap renders correctly — no crash
- [ ] Heatmap shows heat only for activeTransactions (wallet-filtered)
- [ ] Heatmap intensity: 0 transactions = no heat, scales correctly for amounts
- [ ] intensity() function: 0 = no heat, <500 = light, <2000 = medium, <5000+ = bright
- [ ] Tapping a date filters transaction list for that day
- [ ] Tapping a date with no transactions shows empty state — no crash
- [ ] Period filter buttons visible: Week / Month / 3 Month / 6 Month / Year
- [ ] All 5 filter buttons switch data correctly
- [ ] Search icon (🔍) visible beside "Recent Transactions" header
- [ ] Search icon has 🔒 badge in free mode
- [ ] Tapping search icon in free mode → navigates to ProPaywall
- [ ] Transaction list scrolls correctly
- [ ] Each transaction shows correct category colour and emoji

---

### F10. STATS SCREEN — FREE MODE
- [ ] Donut chart renders with correct category breakdown — multiple segments and colours
- [ ] Donut chart uses activeTransactions
- [ ] Filter chips: Week / Month / 3 Month / 6 Month / Year all render
- [ ] All 5 filter chips switch data correctly
- [ ] Line chart renders correctly for each filter period
- [ ] Month view: maps all days (30 or 31) explicitly
- [ ] Month view: label step = `n <= 31 ? 2 : Math.max(1, Math.ceil(n / 10))` → ~15 axis labels
- [ ] Year filter: annual total is GREATER than any single quarter total
- [ ] 6 Month filter: 6-month total is greater than any single 3-month total
- [ ] Income / Expense toggle switches view correctly
- [ ] Zero transactions state does not crash any chart
- [ ] activeTransactions used throughout — not raw transactions

---

### F11. SETTINGS SCREEN — FREE MODE
- [ ] Profile card shows avatar (initial letter if no image), name, age + currency meta line
- [ ] No 👑 PRO badge in free mode
- [ ] "Edit Profile" link visible and tappable
- [ ] Edit Profile: can change name, age, currency — saves correctly on tap Save
- [ ] Edit Profile: profile picture picker opens with 1:1 crop, no ImageManipulator
- [ ] Edit Profile: Cancel discards changes
- [ ] Dark Mode toggle switches theme instantly across whole app
- [ ] App Lock toggle in free mode → navigates to ProPaywall (does NOT open PinSetupModal)
- [ ] DATA MANAGEMENT section is collapsible — tap header to expand/collapse
- [ ] Try Demo row visible at top of DATA MANAGEMENT section
- [ ] Backup (JSON) in free mode → navigates to ProPaywall
- [ ] Export CSV in free mode → navigates to ProPaywall
- [ ] Passcode Export in free mode → navigates to ProPaywall
- [ ] Upload / Restore — always available in free mode — opens document picker
- [ ] Clear All Data → opens custom ClearDataModal (NO native Alert.alert)
- [ ] ClearDataModal: Cancel closes modal, data unchanged
- [ ] ClearDataModal: Confirm clears transactions but preserves: customCategories, appLockEnabled, appLockPin, wallets, activeWalletId, hasOnboarded
- [ ] executeClear uses AsyncStorage.setItem — NOT AsyncStorage.clear()
- [ ] Wallets row → navigates to WalletsScreen
- [ ] App Guide row → navigates to AppGuideScreen (panDownManual, no flash)
- [ ] "👑 Upgrade to Pro" row visible in free mode → navigates to ProPaywall
- [ ] Log Out button visible at bottom
- [ ] Log Out → opens LogoutModal (custom, not Alert.alert)
- [ ] LogoutModal shows "Log Out + Download" and "Log Out without Download" options
- [ ] "Log Out + Download" for free user → routes to ProPaywall (not download)
- [ ] "Log Out without Download" → clears all data including hasOnboarded → navigates to WelcomeScreen
- [ ] After logout, reopening app shows WelcomeScreen
- [ ] Creator credit "crafted by Abhiram Kasturi" and "Finotary · v1.0.1" always visible at bottom
- [ ] ScrollView has paddingBottom:100 so bottom items clear the tab bar

---

### F12. WALLETS SCREEN — FREE MODE
- [ ] WalletsScreen uses slideRight transition (horizontal slide, not panDown)
- [ ] "Personal" wallet shown as active, highlighted with sage tint + "Active" pill
- [ ] Transaction count shown per wallet
- [ ] "New Wallet" button/chip visible
- [ ] Tapping "New Wallet" in free mode → navigates to ProPaywall
- [ ] addWallet() returns 'requires_pro' in free mode
- [ ] Default wallet (Personal) has no delete or archive option
- [ ] Archived wallets section visible if any exist (collapsible)

---

### F13. PRO PAYWALL SCREEN
- [ ] Screen opens with slide-up animation — no white/grey flash
- [ ] Background is exactly #090A09 (deep black) — NOT #1A1D1A
- [ ] "✕" close button visible top right
- [ ] "finotary" logo text visible — Heavy font, ~64px, gold colour
- [ ] Tagline visible below logo
- [ ] Free card shows: ₹0 forever, 4 base features, "Current" marker
- [ ] Pro card shows: ₹49 one-time, "LIMITED TIME" badge, 5 Pro features, "Unlock Pro" CTA
- [ ] "Unlock Finotary Pro →" button triggers 900ms delay then isPro becomes true
- [ ] After unlock: all Pro features immediately available without restart
- [ ] "Restore Purchase" link visible at bottom
- [ ] Legal footer text visible
- [ ] Tapping ✕ close → immediate goBack() — no spring animation
- [ ] Swipe down → immediate goBack()
- [ ] isPro: true persists after app restart (saved to AsyncStorage)

---

## RUN 2 — TEST MODE

---

### P1. SETTINGS — PRO MODE
- [ ] 👑 PRO badge visible on profile card
- [ ] App Lock toggle → opens PinSetupModal (NOT ProPaywall)
- [ ] PinSetupModal step 1: enter 4-digit PIN, "Next" disabled until 4 digits
- [ ] PinSetupModal step 2: confirm PIN, "Enable Lock" disabled until 4 digits
- [ ] Mismatched PINs → error message shown, not Alert.alert
- [ ] Correct PIN confirm → Lock enabled, modal closes
- [ ] App Lock toggle OFF → clears appLockEnabled and appLockPin
- [ ] Backup (JSON) → generates and shares finotary_backup.json file
- [ ] JSON backup contains: transactions, settings, customCategories, wallets, activeWalletId
- [ ] CSV Export → generates finotary_transactions.csv with correct columns: Date, Type, Category, Amount, Note, Wallet
- [ ] CSV file shares correctly via system share sheet
- [ ] Empty transactions → produces valid empty CSV — no crash
- [ ] Passcode Export → opens PasscodeExportModal
- [ ] PasscodeExportModal: minimum 4 character password enforced
- [ ] PasscodeExportModal: password mismatch → error shown
- [ ] Passcode Export produces .enc file with FINOTARY_ENC2: prefix
- [ ] .enc file shares via system share sheet
- [ ] Upload .enc file back → auto-detected → DecryptImportModal opens
- [ ] Correct password → decrypts and restores correctly
- [ ] Wrong password → custom error (no native Alert)
- [ ] "👑 Upgrade to Pro" row NOT visible in Pro mode
- [ ] Download with Logout → downloads backup then logs out

---

### P2. APP LOCK — PRO MODE
- [ ] Setting a PIN: 4 digits required, confirmed
- [ ] Sending app to background then foreground → PIN overlay appears
- [ ] PIN overlay background is exactly #1A1D1A
- [ ] "Finotary" text in gold, "Enter your PIN" label shown
- [ ] 4 dot indicators update as digits entered
- [ ] Correct PIN → unlocks and shows app
- [ ] Wrong PIN → shake animation fires (translateX sequence), PIN cleared
- [ ] Backspace (⌫) key works correctly
- [ ] App Lock does NOT trigger in Demo Mode
- [ ] Disabling App Lock in Settings → PIN overlay no longer appears on next resume

---

### P3. WALLETS — PRO MODE
- [ ] "New Wallet" → opens NewWalletModal
- [ ] NewWalletModal: name input required
- [ ] NewWalletModal: 15 emoji icon picker shown
- [ ] Creating wallet → appears in list immediately
- [ ] Switching wallet → HomeScreen, Activity, Stats all reflect new wallet immediately
- [ ] Transactions added in new wallet → only visible when that wallet is active
- [ ] Switching back to Personal → new wallet's transactions disappear from view (not deleted)
- [ ] Rename wallet → RenameModal opens, name updates correctly
- [ ] Archive wallet → moves to archived section, switches to Personal if it was active
- [ ] Delete wallet → confirmation modal shown (no native Alert)
- [ ] Delete wallet → all its transactions migrated to Personal
- [ ] Personal (default) wallet: no rename? No — it can be renamed. No delete option. No archive option.
- [ ] Archived section is collapsible
- [ ] Unarchive wallet → moves back to active list
- [ ] Active context banner shown when non-default wallet active — "Back to Personal" shortcut works
- [ ] activeWalletId persists after app restart

---

### P4. TRANSACTION SEARCH — PRO MODE
- [ ] Search icon visible beside "Recent Transactions" in ActivityScreen
- [ ] No 🔒 badge in Pro mode
- [ ] Tapping search icon → toggles search bar open
- [ ] Search bar appears smoothly — no flash
- [ ] Typing in search bar filters transactions by note text
- [ ] Typing in search bar filters transactions by amount (as string)
- [ ] Typing in search bar filters transactions by category label
- [ ] Clearing search → shows all transactions again
- [ ] Tapping search icon again → closes search bar, clears query
- [ ] setSearchOpen(false) and setSearchQuery('') both called on close

---

### P5. CUSTOM CATEGORIES — PRO MODE
- [ ] Can add more than 3 custom categories
- [ ] "+ New" chip label stays "New" (not "Pro") in Pro mode
- [ ] Each new category gets a unique colour from DESIGNER_PALETTE
- [ ] Custom categories appear in AddTransaction for the correct transaction type (expense vs income)
- [ ] Can delete custom categories
- [ ] Deleting a category does not delete transactions that used it

---

### P6. DATA PERSISTENCE — PRO MODE
- [ ] Transactions survive app restart
- [ ] isPro: true survives app restart
- [ ] isPro: true survives "Clear All Data"
- [ ] Custom categories survive app restart
- [ ] Custom categories survive "Clear All Data"
- [ ] Active wallet survives app restart
- [ ] Wallets array survives app restart
- [ ] PIN survives app restart
- [ ] appLockEnabled survives app restart
- [ ] Profile (name, age, currency, image, darkMode) survives app restart
- [ ] Demo mode state is NEVER written to AsyncStorage

---

## RUN 3 — DEMO MODE

---

### D1. ENTERING DEMO MODE
- [ ] "Try Demo" row visible in Settings → DATA MANAGEMENT section
- [ ] "Try Demo" row has 🎮 icon and green accent colour
- [ ] Hint text "Explore 2 years of sample data" visible
- [ ] Tapping "Try Demo" loads demo data instantly — no delay or crash
- [ ] Demo data loads with: name "Arjun Sharma", dark theme, Pro unlocked
- [ ] 3 wallets visible: Personal, Savings, Business
- [ ] 5 custom expense categories visible: Gym, Travel, Subscriptions, Gifts, Dining Out
- [ ] 2 custom income categories visible: Freelance, Bonus
- [ ] Transactions span Jan 2024 → Mar 2026 (27 months)

---

### D2. DEMO BANNER
- [ ] Green banner appears at top of every screen immediately after entering demo
- [ ] Banner text: "👀 Demo Mode — read only"
- [ ] "Exit Demo" button visible on right side of banner
- [ ] Banner stays visible on ALL screens (Home, Activity, Stats, Settings, Wallets)
- [ ] Banner zIndex is 999 — appears above all content
- [ ] Banner paddingTop accounts for status bar (44px on Android)
- [ ] Banner cannot be dismissed by swiping or tapping elsewhere

---

### D3. DEMO READ-ONLY ENFORCEMENT
- [ ] Tapping "+" add transaction button → button does nothing (silent block)
- [ ] Attempting to edit a transaction → silently blocked
- [ ] Attempting to delete a transaction → silently blocked
- [ ] Dark Mode toggle → does nothing (silently blocked)
- [ ] App Lock toggle → does nothing (silently blocked)
- [ ] Edit Profile → Save button does nothing (silently blocked)
- [ ] Clear All Data → does nothing (silently blocked)
- [ ] Create new wallet → silently blocked
- [ ] Switch wallet → silently blocked (wallet switching disabled in demo)
- [ ] Add custom category → returns 'demo_mode', no category added
- [ ] No native Alert.alert shown for any blocked action — silent returns only

---

### D4. DEMO NAVIGATION (all screens browsable)
- [ ] All 4 tabs (Home, Activity, Stats, Settings) navigable
- [ ] HomeScreen shows demo transactions for March 2026 (current month)
- [ ] Donut chart in HomeScreen shows MULTIPLE colour segments (not one colour)
- [ ] Category ids in demo data are lowercase (food, bills, transport etc) — getCat() resolves correctly
- [ ] ActivityScreen calendar heatmap renders with 2 years of heat data
- [ ] Activity period filters all work and show correct data ranges
- [ ] Annual filter (Year) shows MORE total than any 3-month or 6-month window
- [ ] StatsScreen donut shows multiple segments and correct colours
- [ ] StatsScreen line chart shows 2 years of trend data on Year filter
- [ ] Wallets tab shows 3 demo wallets — switching is blocked but list is visible
- [ ] ProPaywall can be opened (for browsing) but purchase is blocked in demo
- [ ] AppGuide opens correctly in demo mode

---

### D5. EXITING DEMO MODE
- [ ] Tapping "Exit Demo" button → exits demo immediately
- [ ] After exit: user's real transactions are restored
- [ ] After exit: user's real settings are restored — including their original darkMode value
- [ ] After exit: user's real wallets are restored
- [ ] After exit: user's real customCategories are restored
- [ ] After exit: user's real isPro status is restored
- [ ] After exit: NO demo data written to AsyncStorage
- [ ] After exit: app functions normally — all writes work again
- [ ] Demo banner no longer visible after exit
- [ ] App Lock behaves normally after exit (triggers on background if enabled)

---

## UNIVERSAL TESTS — ALL MODES

---

### U1. NAVIGATION & TRANSITIONS
- [ ] AddTransactionScreen: panDownManual, spring stiffness 240, no flash on open
- [ ] AppGuideScreen: panDownManual, spring stiffness 240, no flash on open
- [ ] ProPaywallScreen: panDownManual, spring stiffness 240, no flash on open
- [ ] WalletsScreen: slideRight, animationDuration 250, horizontal gesture
- [ ] All panDownManual screens: immediate goBack() on close — no spring-down exit
- [ ] No white or grey flash on any modal or screen transition on Android
- [ ] WelcomeScreen: no back button, hardware back does nothing
- [ ] navigation.reset used for onboarding exit and logout
- [ ] ProPaywall and Wallets in BOTH Stack branches (sharedScreens pattern)
- [ ] No JSX comments inside navigator blocks
- [ ] All stack screens have contentStyle: {backgroundColor: '#111'}
- [ ] Tab bar elevation: 100, inactive tabs display: 'none'
- [ ] MainTabs uses custom tab bar — NOT Tab.Navigator

---

### U2. FONTS & VISUAL DESIGN
- [ ] Every text element uses Fungis-Regular, Fungis-Bold, or Fungis-Heavy — no system fonts
- [ ] Font keys are Fungis-* (never FUNGIS-*)
- [ ] Light theme: bg #F6F0D7, surface #FDFAF0, surface2 #EDE8CE, accent #9CAB84, textPrimary #2C3320
- [ ] Dark theme: bg #222629, surface #474B47, surface2 #6B6E70, accent #AEB784, textPrimary #FFFFFF
- [ ] ProPaywall bg: #090A09
- [ ] AppLock overlay bg: #1A1D1A
- [ ] Modal sheet bg: #2C3020
- [ ] Onboarding overlay: rgba(0,0,0,0.90)
- [ ] Border dark: rgba(107,110,112,0.3)
- [ ] Accent dark theme: #AEB784, light: #9CAB84
- [ ] expense colour dark: #B07070, light: #8B3A3A
- [ ] income colour dark: #AEB784, light: #4A6741

---

### U3. DATA MODEL INTEGRITY
- [ ] Every transaction has all 7 required fields: id, type, amount, category, customCategory, date, note, walletId
- [ ] transaction.type is exactly 'income' or 'expense' — nothing else
- [ ] transaction.category is a lowercase id matching EXPENSE_CATEGORIES or INCOME_CATEGORIES
- [ ] transaction.id is Date.now().toString()
- [ ] transaction.walletId is always set — never null/undefined
- [ ] Old transactions without walletId default to 'default' via (t.walletId || 'default')
- [ ] Every wallet has: id, name, icon, archived fields
- [ ] Default wallet always exists with id: 'default'
- [ ] customCategories has expense[] and income[] arrays
- [ ] settings object always has all 8 fields: name, age, currency, darkMode, profileImage, appLockEnabled, appLockPin

---

### U4. EDGE CASES & CRASHES
- [ ] App loads with zero transactions — no crash on any screen
- [ ] App loads with no profile image — no crash
- [ ] Very long username (50+ chars) — numberOfLines={1} + ellipsis, no layout break
- [ ] Amount maxLength={12} enforced — can't enter more than 12 digits
- [ ] Rapid tab switching 10+ times — no crash or freeze
- [ ] Very large transaction amount (₹9,999,999,999) — renders without overflow
- [ ] Transactions on Feb 29 in a non-leap year — date validation blocks this
- [ ] Feb 31, Apr 31, Jun 31 — all blocked by date validation in handleSubmit
- [ ] App survives being backgrounded and resumed 5+ times
- [ ] App works fully offline — no internet required for any feature
- [ ] Importing a backup with isPro:true does NOT grant Pro (security: LOAD_DATA strips isPro from payload)
- [ ] Importing a backup does NOT overwrite appLockEnabled/appLockPin (security)

---

### U5. SECURITY CHECKS
- [ ] LOAD_DATA reducer does NOT allow isPro override from imported backup
- [ ] LOAD_DATA reducer does NOT allow appLockEnabled/appLockPin override from backup
- [ ] AppLockOverlay fires on mount (cold-boot with lock enabled shows PIN immediately)
- [ ] AppLockOverlay fires on background→foreground transition
- [ ] Demo mode data is NEVER persisted to AsyncStorage
- [ ] executeClear uses AsyncStorage.setItem — confirmed NOT AsyncStorage.clear()
- [ ] No native Alert.alert anywhere in the app (search all files for Alert.alert)

---

### U6. APPGUIDE SCREEN
- [ ] Opens from Settings APP section
- [ ] panDownManual transition, no flash
- [ ] Closes immediately on swipe down — no spring-down exit
- [ ] Free Features section shows correct features
- [ ] Pro Features section shows correct features
- [ ] Footnote text visible at bottom
- [ ] spring stiffness is 240 in internal Animated.View

---

### U7. TERMS MODAL (CreateAccountScreen)
- [ ] 6 sections present
- [ ] Section 1: Acceptance of Terms — mentions Abhiram Kasturi
- [ ] Section 2: Data Storage & Privacy — mentions local-only storage
- [ ] Section 3: Pro Subscription & Payments — mentions ₹199 one-time, non-refundable
- [ ] Section 4: User Responsibilities
- [ ] Section 5: Intellectual Property — mentions Abhiram Kasturi
- [ ] Section 6: Disclaimer
- [ ] "Last updated March 2026" visible at top
- [ ] "I Understand" button does NOT auto-tick checkbox

---

### U8. CATEGORY COLOUR SYSTEM
- [ ] food: #ECA72C
- [ ] petrol: #B10F2E
- [ ] shopping: #9984D4
- [ ] books: #EDE580
- [ ] transport: #B3C0A4 (or #A3BFA8)
- [ ] health: #98CE00 (or #A3BFA8)
- [ ] bills: #3993DD
- [ ] others: #221E22
- [ ] salary (income): #A3BFA8
- [ ] freelance (income): #9984D4
- [ ] gift (income): #ECA72C
- [ ] DESIGNER_PALETTE has 25 unique colours for custom categories
- [ ] Each new custom category gets a unique colour not already used

---

## FINAL REPORTING INSTRUCTIONS

After completing all 3 runs, produce a structured report:

**SECTION 1 — PASS SUMMARY:** Count of tests passed per run.

**SECTION 2 — FAILURES:** For every failed test:
```
TEST: [test name]
MODE: [Free / Pro / Demo]
FILE: [exact filename]
FUNCTION: [exact function name]
LINE: [approximate line or code snippet]
BUG: [description of what went wrong]
FIX: [exact code to apply]
```

**SECTION 3 — NEW BUGS FOUND:** Any bugs discovered beyond the test list above — describe and fix.

**SECTION 4 — KNOWLEDGE BASE UPDATES:** List every item in this test prompt that reveals something new, changed, or that should be updated in the project knowledge base MD file.

**RULES — MUST FOLLOW AT ALL TIMES:**
- Never use native Alert.alert
- Never use FUNGIS-* font keys — always Fungis-*
- Never break sharedScreens navigation pattern
- Never use AsyncStorage.clear()
- Never add KAV to AddTransactionScreen
- Never use ImagePicker.MediaTypeOptions
- All fixes must respect Section 23 of the project knowledge base
