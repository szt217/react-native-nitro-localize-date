import { DateStyle } from './specs/RNLocalizeDate.nitro';
export { DateStyle };
export declare class DateFormatter {
    private formatter;
    /**
     * Creates a `DateFormatter` object based on to provided settings.
     *
     * @param { string } defaultLocale A BCP 47 string language tag representing the default locale to use when none of the user's preferred languages are supported. This parameter will only be used on Android, iOS automatically decides the locale based on the supported locales in the info.plist file. Please refer to the readme for more information on how to set up the supported locales on iOS.
     * @param { string[] } supportedLocales An array of BCP 47 string language tags representing the supported locales. This parameter will only be used on Android, iOS automatically decides the locale based on the supported locales in the info.plist file. Please refer to the readme for more information on how to set up the supported locales on iOS.
     * @param { DateStyle } dateStyle The style to use for the date portion formatting.
     * @param { DateStyle } timeStyle The style to use for the time portion formatting.
     */
    constructor(defaultLocale: string, supportedLocales: string[], dateStyle: DateStyle, timeStyle: DateStyle);
    /**
     * Localizes a `Date` into a date and time string according to the styles specified in the constructor.
     * The result is platform dependent and will use the user's device settings
     * to automatically create a correctly localized date.
     *
     * This function automatically uses the first preferred language set in the device settings.
     *
     * For more information, refer to the corresponding documentation for
     * [iOS](https://developer.apple.com/documentation/foundation/dateformatter/1415241-localizedstring) and [Android](https://developer.android.com/reference/android/icu/text/DateFormat).
     * @param { Date } date The `Date` to convert.
     * @returns { string } The localized date and time string.
     */
    format(date: Date): string;
}
