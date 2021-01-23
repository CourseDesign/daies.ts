import Year, { YearLike } from "./year";
import Month, { MonthLike } from "./month";
import YearMonth from "./year-month";

function parseDay(year: Year, month: Month, day: number): number {
  const days = new YearMonth(year, month).getDays();
  return (day + days) % (days + 1);
}

function getYearAndMonthAndDay(value: number): [number, number, number] {
  let current = 0;
  for (let year = 1970; ; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      const currentDays = new YearMonth(year, month).getDays();
      if (current + currentDays > value) {
        return [year, month, value - current + 1];
      }
      current += currentDays;
    }
  }
}

// 1970-01-01 => 0
// 1970-01-02 => 1
function getValue(year: Year, month: Month, day: number): number {
  let current = 0;
  for (let i = 1970; i < year.getYear() - 1; i += 1) {
    current += new Year(i).getDays();
  }
  for (let i = 0; i < month.getMonth(); i += 1) {
    current += new YearMonth(year, i).getDays();
  }

  return current + day - 1;
}

export type DayLike = number | string | Day;

class Day {
  private readonly year: Year;

  private readonly month: Month;

  private day: number;

  private value?: number;

  constructor(year: YearLike, month: MonthLike, day: number | string);
  constructor(value: DayLike);
  constructor(p1: YearLike | DayLike, p2?: MonthLike, p3?: number | string) {
    if (p2 != null && p3 != null) {
      this.year = new Year(p1);
      this.month = new Month(p2);
      this.day = parseDay(this.year, this.month, Number(p3));
    } else if (typeof p1 === "number") {
      const [year, month, day] = getYearAndMonthAndDay(p1);
      this.year = new Year(year);
      this.month = new Month(month);
      this.day = day;
      this.value = p1;
    } else if (typeof p1 === "string") {
      const date = new Date(p1);
      this.year = new Year(date.getFullYear());
      this.month = new Month(date.getMonth());
      this.day = date.getDate();
    } else if (p1 instanceof Day) {
      this.year = p1.toYear();
      this.month = p1.toMonth();
      this.day = p1.getDay();
    } else {
      throw new TypeError("invalid argument");
    }
  }

  getYear(): number {
    return this.year.getYear();
  }

  setYear(year: number, month?: number): number {
    this.value = undefined;
    this.year.setYear(year);
    if (month != null) this.month.setMonth(month);
    return this.valueOf();
  }

  getMonth(): number {
    return this.month.getMonth();
  }

  setMonth(month: number): number {
    this.value = undefined;
    this.month.setMonth(month);
    return this.valueOf();
  }

  getDay(): number {
    return this.day;
  }

  setDay(day: number): number {
    this.value = undefined;
    this.day = parseDay(this.year, this.month, day);
    return this.valueOf();
  }

  diff(year: YearLike, month: MonthLike, day: number | string): number;
  diff(value: number | string | Day): number;
  diff(
    p1: YearLike | number | string | Day,
    p2?: MonthLike,
    p3?: number | string
  ): number {
    return (
      this.valueOf() -
      (p1 instanceof Day ? p1 : new Day(p1, p2 as never, p3 as never)).valueOf()
    );
  }

  valueOf(): number {
    if (this.value == null) {
      this.value = getValue(this.year, this.month, this.day);
    }
    return this.value;
  }

  toString(): string {
    return `${this.year}-${this.month}-${`0${this.day.toString()}`.slice(-2)}`;
  }

  toYear(): Year {
    return new Year(this.year);
  }

  toMonth(): Month {
    return new Month(this.month);
  }
}

export default Day;
