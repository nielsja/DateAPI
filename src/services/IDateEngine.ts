import { DateType } from 'contracts';

export interface IDateEngine {
  getDateString(dateObj: Date): string;

  getDateType(dateObj: Date): DateType;

  getNextDate(
    dateObj: Date,
    searchDirection: boolean,
    dateType?: DateType
  ): string;
}
