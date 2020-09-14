import { DateEngine, IDateEngine } from '../../src/services'

import { DateType } from '../../src/contracts'

const engine: IDateEngine = new DateEngine()

describe('getDateString()', () => {
  it('should return the date in M/d/yyyy format', () => {
    const testDate = new Date()
    const year = testDate.getFullYear()
    const month = testDate.getMonth()
    const day = testDate.getDate()

    const expected = `${month + 1}/${day}/${year}`
    const actual = engine.getDateString(testDate)

    expect(actual).toStrictEqual(expected)
  })
})

describe('getDateType()', () => {
  it('should return Business day', () => {
    const testDate = new Date(2020, 7, 20) // Thursday, Aug 20 2020
    const expected = DateType.Business
    const actual = engine.getDateType(testDate)
    expect(actual).toStrictEqual(expected)
  })

  it('should return Weekend', () => {
    const testDate = new Date(2020, 7, 23) // Sunday, Aug 23 2020
    const expected = DateType.Weekend
    const actual = engine.getDateType(testDate)
    expect(actual).toStrictEqual(expected)
  })

  it('should return Holiday', () => {
    const testDate = new Date(2020, 11, 25) // Christmas Day
    const expected = DateType.Holiday
    const actual = engine.getDateType(testDate)
    expect(actual).toStrictEqual(expected)
  })
})

describe('getNextDate()', () => {
  it('should return the next calendar date as string (M/d/yyyy)', () => {
    const testDate = new Date(2020, 8, 14)
    const expected = '9/15/2020'
    const actual = engine.getNextDate(testDate, true)
    expect(actual).toStrictEqual(expected)
  })

  it('should return the next business date as string (M/d/yyyy)', () => {
    const testDate = new Date(2020, 8, 14)
    const expected = '9/15/2020'
    const actual = engine.getNextDate(testDate, true, DateType.Business)
    expect(actual).toStrictEqual(expected)
  })

  it('should return the next weekend date as string (M/d/yyyy)', () => {
    const testDate = new Date(2020, 8, 14)
    const expected = '9/19/2020'
    const actual = engine.getNextDate(testDate, true, DateType.Weekend)
    expect(actual).toStrictEqual(expected)
  })

  it('should return the next holiday date as string (M/d/yyyy)', () => {
    const testDate = new Date(2020, 8, 14)
    const expected = '10/12/2020' // Columbus Day
    const actual = engine.getNextDate(testDate, true, DateType.Holiday)
    expect(actual).toStrictEqual(expected)
  })
})
