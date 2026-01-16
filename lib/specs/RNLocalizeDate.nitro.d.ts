import type { HybridObject } from 'react-native-nitro-modules';
/**
 * Enum representing the different styles for date and time localization.
 * Each value maps to the corresponding style of the current platform.
 *
 * For more information, refer to the corresponding documentation for
 * [iOS](https://developer.apple.com/documentation/foundation/dateformatter/style) and [Android](https://developer.android.com/reference/android/icu/text/DateFormat#:~:text=The%20exact%20result%20depends%20on%20the%20locale%2C%20but%20generally).
 */
export declare enum DateStyle {
    NONE = 0,
    SHORT = 1,
    MEDIUM = 2,
    LONG = 3,
    FULL = 4
}
export interface StringHolder {
    value: string;
}
export interface RNLocalizeDateFormatter extends HybridObject<{
    ios: 'swift';
    android: 'kotlin';
}> {
    initialize(defaultLocale: string, supportedLocales: StringHolder[], dateStyle: DateStyle, timeStyle: DateStyle): void;
    format(time: number): string;
}
