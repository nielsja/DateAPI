export interface IDateValidationEngine {
  /**
   * Parses the string values to numbers.
   * Returns null if the values are successfully parsed to numbers.
   * Returns a string if the values return NaN when being parsed.
   * The string details which values are invalid, which can be
   * used for an error message.
   * @param yearStr the string to be parsed to a number for the year
   * @param monthStr the string to be parsed to a number for the month
   * @param dayStr the string to be parsed to a number for the day
   */
  parseDateStringToNumber(
    yearStr: string,
    monthStr: string,
    dayStr: string
  ): string;

  /**
   * Checks if the numbers are positive values.
   * Returns null if the values are positive.
   * Returns a string if the values are negative.
   * The string details which values are negative, which can be
   * used for an error message.
   * @param year the year number value to check
   * @param month the month number value to check
   * @param day the day number value to check
   */
  checkPositiveValues(year: number, month: number, day: number): string;

  /**
   * Checks if the numbers are valid date values.
   * Returns null if the values are valid.
   * Returns a string if the values are invalid.
   * The string details which values are invalid, which can be
   * used for an error message.
   * @param year the year of the month/day to check
   * @param month the month number value to check
   * @param day the day number value to check
   */
  checkValidValues(year: number, month: number, day: number): string;
}
