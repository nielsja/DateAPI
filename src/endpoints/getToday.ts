import { DateEngine } from '../services';
import { IDate, DateType } from '../contracts';
import { IDateEngine } from 'services/IDateEngine';

export const getToday = (): IDate => {
  const engine: IDateEngine = new DateEngine();
  const date = new Date();

  return {
    date: engine.getDateString(date),
    type: engine.getDateType(date),
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
