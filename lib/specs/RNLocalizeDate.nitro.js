/**
 * Enum representing the different styles for date and time localization.
 * Each value maps to the corresponding style of the current platform.
 *
 * For more information, refer to the corresponding documentation for
 * [iOS](https://developer.apple.com/documentation/foundation/dateformatter/style) and [Android](https://developer.android.com/reference/android/icu/text/DateFormat#:~:text=The%20exact%20result%20depends%20on%20the%20locale%2C%20but%20generally).
 */
export var DateStyle;
(function (DateStyle) {
    DateStyle[DateStyle["NONE"] = 0] = "NONE";
    DateStyle[DateStyle["SHORT"] = 1] = "SHORT";
    DateStyle[DateStyle["MEDIUM"] = 2] = "MEDIUM";
    DateStyle[DateStyle["LONG"] = 3] = "LONG";
    DateStyle[DateStyle["FULL"] = 4] = "FULL";
})(DateStyle || (DateStyle = {}));
