# react-native-nitro-localize-date

[![GitHub License](https://img.shields.io/github/license/RootPlatform/react-native-nitro-localize-date)](https://github.com/RootPlatform/react-native-nitro-localize-date/blob/main/LICENSE.txt)

React Native date localization using correct platform specific preferences.

**This is a fork of [react-native-localize-date](https://github.com/jobpaardekooper/react-native-localize-date) with updated Nitro Modules compatibility (0.29.4+).**

This library allows you to localize date and time according to the device locale and additional platform-specific user settings, **providing a date localization experience that aligns with users' expectations from native apps**.

The output format is platform-dependent and might, for example, even differ between various Android vendors. More information regarding the specifics can be found in the corresponding [iOS](https://developer.apple.com/documentation/foundation/dateformatter/1415241-localizedstring) and [Android](https://developer.android.com/reference/android/icu/text/DateFormat) documentation.

## Changes from upstream

- Updated nitrogen generated Swift files to be compatible with `react-native-nitro-modules` 0.29.4+
- Peer dependency changed to `react-native-nitro-modules: >=0.20.1`

## Table of Contents

- [Why is this library needed?](#why-is-this-library-needed)
- [Installation](#installation)
  - [iOS Setup](#ios-setup)
    - [Setup with Expo plugin](#setup-with-expo-plugin)
    - [Manual iOS plist steps](#manual-ios-plist-steps)
  - [Android Setup](#android-setup)
- [Usage](#usage)
- [API](#api)
  - [`DateStyle`](#datestyle)
  - [`new DateFormatter`](#new-dateformatterdefaultlocale-string-supportedlocales-string-datestyle-datestyle-timestyle-datestyle)
  - [`DateFormatter.format`](#dateformatterformatdate-date)
- [Platform Differences](#platform-differences)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Why is this library needed?

Localizing date and time based only on a [BCP 47 language tag](https://www.techonthenet.com/js/language_tags.php) (for example, using [`react-native-localize`](https://github.com/zoontek/react-native-localize)) does not yield results as expected on native platforms. This is because the language tag is based on language and region settings, but iOS and Android both provide additional settings to control date and time formatting beyond language and region.

> For example, on my iPhone with my personal settings, the language tag that an app will receive is `en-US`. Using this tag with [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) yields the date format `MM/DD/YYYY`:
>
> ```js
> Intl.DateTimeFormat('en-US').format(new Date())
> // '11/20/2024'
> ```
>
> But with my settings (`General > Language & Region > Date Format` on iOS 18), as a user, I would expect the date to be formatted as `DD/MM/YYYY` and thus be `20/11/2024`.

This library solves this issue by providing an API for native platform date to localized string formatters.

## Installation

Install the library as follows:

```sh
# npm
npm i react-native-nitro-modules react-native-nitro-localize-date

# yarn
yarn add react-native-nitro-modules react-native-nitro-localize-date

# pnpm
pnpm add react-native-nitro-modules react-native-nitro-localize-date
```

Then for iOS:
```sh
cd ios && pod install
```

This library was created using [Nitro Modules](https://github.com/mrousavy/nitro), so it is required to install `react-native-nitro-modules` as a peer dependency [(read more)](https://nitro.margelo.com/docs/for-users).

The library works with both the new and old architectures. React Native version `0.75.x` and above is supported.

### iOS Setup

iOS requires additional configuration to tell the system which locales your app supports.

#### Setup with Expo plugin

After you installed the package, add the following to your `app.json` plugins array:

```json
{
  "plugins": [
    [
      "react-native-nitro-localize-date",
      {
        "defaultLocale": "en",
        "supportedLocales": [
          "en",
          "fr",
          "de"
        ]
      }
    ]
  ]
}
```

Now run:

```bash
npx expo prebuild
```

#### Manual iOS plist steps

iOS automatically determines the locale that will be used based on the locales that your app claims to support in the `info.plist` file. To make use of this library, you need to add the languages you support (`CFBundleLocalizations`) and a fallback language (`CFBundleDevelopmentRegion`).

As an example, if your app supports English, French, and German with the fallback language set to English, you should add the following to the `info.plist`:

```xml
<key>CFBundleDevelopmentRegion</key>
<string>en</string>
<key>CFBundleLocalizations</key>
<array>
  <string>en</string>
  <string>fr</string>
  <string>de</string>
</array>
```

This is all the setup needed for iOS. If you specifically want to know more about how this works on iOS, you can follow these links:

- [How iOS Determines the Language For Your App](https://developer.apple.com/library/archive/qa/qa1828/_index.html)
- [`CFBundleDevelopmentRegion`](https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundledevelopmentregion)
- [`CFBundleLocalizations`](https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundlelocalizations)

### Android Setup

Android requires **no additional native configuration**. The locale information is passed programmatically via the `defaultLocale` and `supportedLocales` parameters when creating a `DateFormatter`.

Android uses [`java.text.DateFormat`](https://developer.android.com/reference/android/icu/text/DateFormat) under the hood, which automatically respects the device's system locale and date format preferences.

**Important notes for Android:**
- The `defaultLocale` and `supportedLocales` parameters are **only used on Android** (iOS ignores them and uses the `info.plist` configuration instead)
- Make sure `defaultLocale` is included in `supportedLocales`
- Date format output may vary between Android versions and device manufacturers (Samsung, Pixel, etc. may have different formatting)

## Usage

```typescript
import {
  DateStyle,
  DateFormatter
} from 'react-native-nitro-localize-date'

const date = new Date()
const defaultLocale = 'en'
const supportedLocales = ['en', 'fr', 'de']

// Create a formatter for short date and time
const shortFormatter = new DateFormatter(defaultLocale, supportedLocales, DateStyle.SHORT, DateStyle.SHORT)
shortFormatter.format(date)
// Example output: '20/11/2024 16:48'

// Create a formatter for date only (no time)
const dateOnlyFormatter = new DateFormatter(defaultLocale, supportedLocales, DateStyle.SHORT, DateStyle.NONE)
dateOnlyFormatter.format(date)
// Example output: '20/11/2024'

// Create a formatter for long date format
const longFormatter = new DateFormatter(defaultLocale, supportedLocales, DateStyle.LONG, DateStyle.NONE)
longFormatter.format(date)
// Example output: 'November 20, 2024'
```

## API

### `DateStyle`

Enum representing the different styles for date and time localization. Each value maps to the corresponding style of the current platform.

| Value | Description | Example (varies by locale) |
|-------|-------------|---------------------------|
| `NONE` | No date/time output | - |
| `SHORT` | Shortest representation | `11/20/24` or `4:30 PM` |
| `MEDIUM` | Medium representation | `Nov 20, 2024` or `4:30:00 PM` |
| `LONG` | Long representation | `November 20, 2024` or `4:30:00 PM EST` |
| `FULL` | Complete representation | `Wednesday, November 20, 2024` or `4:30:00 PM Eastern Standard Time` |

For more information, refer to the corresponding documentation for [iOS](https://developer.apple.com/documentation/foundation/dateformatter/style) and [Android](https://developer.android.com/reference/android/icu/text/DateFormat#:~:text=The%20exact%20result%20depends%20on%20the%20locale%2C%20but%20generally).

### `new DateFormatter(defaultLocale: string, supportedLocales: string[], dateStyle: DateStyle, timeStyle: DateStyle)`

Creates a DateFormatter with the options specified in the constructor.

| Parameter | Type | Description |
|-----------|------|-------------|
| `defaultLocale` | `string` | Fallback locale when user's locale isn't in `supportedLocales`. **Android only** - iOS uses `info.plist`. |
| `supportedLocales` | `string[]` | List of locales your app supports. Must contain `defaultLocale`. **Android only** - iOS uses `info.plist`. |
| `dateStyle` | `DateStyle` | Style for the date portion of the output. |
| `timeStyle` | `DateStyle` | Style for the time portion of the output. |

**Note:** `dateStyle` and `timeStyle` can't both be `DateStyle.NONE` at the same time (this will throw an error).

### `DateFormatter.format(date: Date)`

Returns a localized string for the provided date object according to the styles defined when constructing the formatter.

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date` | The JavaScript Date object to format. |

**Returns:** `string` - The formatted date string according to device preferences.

## Platform Differences

| Aspect | iOS | Android |
|--------|-----|---------|
| Locale configuration | Via `info.plist` (`CFBundleLocalizations`) | Via `defaultLocale` and `supportedLocales` parameters |
| Date format source | `NSDateFormatter` | `java.text.DateFormat` |
| Respects system date format preference | Yes (Settings > General > Language & Region > Date Format) | Yes (varies by Android version/manufacturer) |
| Output consistency | Consistent across iOS devices | May vary between manufacturers |

## Troubleshooting

### iOS: Dates not formatting according to user preferences

Make sure you've added the `CFBundleLocalizations` and `CFBundleDevelopmentRegion` keys to your `info.plist`. Without these, iOS won't know which locales your app supports.

### Android: Unexpected date format

- Ensure `defaultLocale` is included in `supportedLocales`
- Remember that Android date formatting can vary by manufacturer - test on multiple devices if possible
- The device's system locale settings take precedence

### Build errors with Nitro Modules

This fork is compatible with `react-native-nitro-modules` version 0.20.1 and above. If you encounter build errors:

1. Make sure you have a compatible version of `react-native-nitro-modules` installed
2. Run `pod install` after installation
3. Clean your build folder and rebuild

## Credits

Original package by [Job Paardekooper](https://github.com/jobpaardekooper).

Fork maintained by [Root Platform](https://github.com/RootPlatform).

## Contributing

Since this library uses [Nitro Modules](https://github.com/mrousavy/nitro), it's best to familiarize yourself with their docs before trying to contribute.

External contributions are always appreciated *if something needs to be changed*. Please first open an issue to discuss the changes.

## License

MIT
