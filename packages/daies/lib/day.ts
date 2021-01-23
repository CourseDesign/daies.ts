import Year, { YearLike } from "./year";
import Month, { MonthLike } from "./month";
import YearMonth from "./year-month";

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
  for (let i = 1970; i < year.getYear(); i += 1) {
    current += new Year(i).getDays();
  }
  for (let i = 0; i < month.getMonth(); i += 1) {
    current += new YearMonth(year, i).getDays();
  }

  return current + day - 1;
}

export type DayLike = number | string | Day;

class Day {
  private year: Year;

  private month: Month;

  private day: number;

  private value: number;

  constructor(year: YearLike, month: MonthLike, day: number | string);
  constructor(value: DayLike);
  constructor(p1: YearLike | DayLike, p2?: MonthLike, p3?: number | string) {
    if (p2 != null && p3 != null) {
      const year = new Year(p1 as never);
      const month = new Month(p2);
      this.value = getValue(year, month, Number(p3));
    } else if (typeof p1 === "number") {
      this.value = p1;
    } else if (typeof p1 === "string") {
      const date = new Date(p1);
      this.value = getValue(
        new Year(date.getFullYear()),
        new Month(date.getMonth()),
        date.getDate()
      );
    } else if (p1 instanceof Day) {
      this.value = getValue(p1.toYear(), p1.toMonth(), p1.getDay());
    } else {
      throw new TypeError("invalid argument");
    }

    const [year, month, day] = getYearAndMonthAndDay(this.value);
    this.year = new Year(year);
    this.month = new Month(month);
    this.day = day;
  }

  getYear(): number {
    return this.year?.getYear() ?? 0;
  }

  setYear(year: number, month?: number): number {
    this.value = getValue(
      new Year(year),
      month != null ? new Month(month) : this.month,
      this.day
    );
    this.update();
    return this.valueOf();
  }

  getMonth(): number {
    return this.month.getMonth();
  }

  setMonth(month: number): number {
    this.value = getValue(
      this.year,
      month != null ? new Month(month) : this.month,
      this.day
    );
    this.update();
    return this.valueOf();
  }

  getDay(): number {
    return this.day;
  }

  setDay(day: number): number {
    this.value = getValue(this.year, this.month, day);
    this.update();
    return this.valueOf();
  }

  getDayOfWeek(): number {
    return new Date(
      this.year.getYear(),
      this.month.getMonth(),
      this.day
    ).getDay();
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
    return `${this.year.toString()}-${this.month.toString()}-${`0${this.day.toString()}`.slice(
      -2
    )}`;
  }

  toYear(): Year {
    return new Year(this.year);
  }

  toMonth(): Month {
    return new Month(this.month);
  }

  private update() {
    const [year, month, day] = getYearAndMonthAndDay(this.value);
    this.year = new Year(year);
    this.month = new Month(month);
    this.day = day;
  }
}

export default Day;
