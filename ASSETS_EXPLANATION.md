# Assets Explanation

## Why These Assets Exist

### 1. **splash.png** - Native Splash Screen
**What it is:** This is the **native splash screen** that shows BEFORE your React Native app loads.

**When it appears:**
- When you first open the app
- Before React Native JavaScript bundle loads
- Very briefly (usually 1-2 seconds)

**Why it's needed:**
- Provides instant visual feedback when app launches
- Shows while the app is loading
- Better user experience (no blank screen)

**In your app:**
- Defined in `app.json` → `splash.image`
- Shows your logo/design while app initializes
- Then your `SplashScreen.tsx` (React component) takes over

**Difference:**
- `splash.png` = Native (shows first, before React loads)
- `SplashScreen.tsx` = React component (shows after React loads)

---

### 2. **favicon.png** - Web Favicon
**What it is:** The small icon that appears in browser tabs when you run the web version.

**When it's used:**
- Only when running `npm run web` or `expo start --web`
- Shows in browser tab
- Not used in iOS/Android apps

**Why it exists:**
- Expo supports web builds
- Needed for web version of your app
- Standard web development practice

**If you don't need web version:** You can ignore this, but it doesn't hurt to have it.

---

### 3. **icon.png** - App Icon
**What it is:** The icon that appears on the home screen of iOS/Android devices.

**When it's used:**
- Shows on device home screen
- App store listings
- System app switcher

**Size:** Should be 1024x1024px

---

### 4. **adaptive-icon.png** - Android Adaptive Icon
**What it is:** Android's adaptive icon format (Android 8.0+).

**When it's used:**
- Android devices only
- Allows Android to create different icon shapes
- Better Android integration

**Size:** Should be 1024x1024px

---

### 5. **logo.png** - Your Logo
**What it is:** Your actual ZeroTrace logo that you exported from Figma.

**When it's used:**
- In `SplashScreen.tsx` (the React component)
- Shows inside the white circular container
- Part of your app's UI

**This is the one you just added!** ✅

---

## Summary

| Asset | Purpose | Used Where |
|-------|---------|------------|
| `splash.png` | Native splash (before React loads) | `app.json` |
| `logo.png` | Your logo in app UI | `SplashScreen.tsx` |
| `icon.png` | App icon (home screen) | `app.json` |
| `adaptive-icon.png` | Android adaptive icon | `app.json` (Android) |
| `favicon.png` | Web browser icon | `app.json` (Web only) |

---

## Do You Need All of Them?

**For Development (Expo Go):**
- ✅ `logo.png` - Yes (used in your splash screen)
- ✅ `splash.png` - Yes (native splash)
- ⚠️ Others - Optional for now, but needed for production

**For Production:**
- All of them are needed for a complete app

---

## Current Status

✅ You have `logo.png` - Perfect!  
✅ You have `favicon.png` - Good for web  
⚠️ `splash.png` - Still placeholder (blue square)  
⚠️ `icon.png` - Still placeholder  
⚠️ `adaptive-icon.png` - Still placeholder  

**Next Steps:**
1. Export splash screen from Figma → replace `splash.png`
2. Export app icon from Figma → replace `icon.png` and `adaptive-icon.png`
3. Or keep placeholders for now and replace later

