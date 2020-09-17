import { DateEngine, IDateEngine } from '../services';
import { IDate, DateType } from '../contracts';

export const getToday = (): IDate => {
  return {
    date: 'string',
    type: DateType.Business,
    nextDate: 'string',
    nextBusinessDate: 'string',
    nextWeekendDate: 'string',
    nextHolidayDate: 'string',
    previousDate: 'string',
    previousBusinessDate: 'string',
    previousWeekendDate: 'string',
    previousHolidayDate: 'string',
  };

  // const engine: IDateEngine = new DateEngine();
  // const date = new Date();

  // return {
  //   date: engine.getDateString(date),
  //   type: engine.getDateType(date),
  //   nextDate: engine.getNextDate(date, true),
  //   nextBusinessDate: engine.getNextDate(date, true, DateType.Business),
  //   nextWeekendDate: engine.getNextDate(date, true, DateType.Weekend),
  //   nextHolidayDate: engine.getNextDate(date, true, DateType.Holiday),
  //   previousDate: engine.getNextDate(date, false),
  //   previousBusinessDate: engine.getNextDate(date, false, DateType.Business),
  //   previousWeekendDate: engine.getNextDate(date, false, DateType.Weekend),
  //   previousHolidayDate: engine.getNextDate(date, false, DateType.Holiday),
  // };
};
