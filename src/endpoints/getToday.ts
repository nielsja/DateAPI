import { IDate, DateType } from '../contracts';
import { parseISO } from 'date-fns';
import { DateEngine } from '../services/DateEngine';

export const getToday = (): IDate => {
  const dateObj: Date = new Date();

  const engine: DateEngine = new DateEngine();

  return {
    date: engine.getDateString(dateObj),
    type: engine.getDateType(dateObj),
    nextDate: 'string',
    nextBusinessDate: null,
    nextWeekendDate: null,
    nextHolidayDate: null,
    previousDate: 'string',
    previousBusinessDate: null,
    previousWeekendDate: null,
    previousHolidayDate: null,
  };
};
