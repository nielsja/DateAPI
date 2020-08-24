import { DateType } from './DateType';

export interface IDate {
  date: string;
  type: DateType;
  nextDate: string;
  nextBusinessDate: string | null;
  nextWeekendDate: string | null;
  nextHolidayDate: string | null;
  previousDate: string;
  previousBusinessDate: string | null;
  previousWeekendDate: string | null;
  previousHolidayDate: string | null;
}
