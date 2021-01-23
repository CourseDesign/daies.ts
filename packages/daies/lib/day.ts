import Year, { YearLike } from "./year";
import Month, { MonthLike } from "./month";

export type DayLike = number | string | Day;

class Day {
  private date: Date;

  constructor(year: YearLike, month: MonthLike, day: number | string);
  constructor(value: DayLike);
  constructor(p1: YearLike | DayLike, p2?: MonthLike, p3?: number | string) {
    if (p2 != null && p3 != null) {
      const year = new Year(p1 as never);
      const month = new Month(p2);
      this.date = new Date(year.getYear(), month.getMonth(), Number(p3));
    } else if (typeof p1 === "number") {
      this.date = new Date(p1 * 24 * 60 * 60 * 1000);
    } else if (typeof p1 === "string") {
      this.date = new Date(p1);
    } else if (p1 instanceof Day) {
      this.date = new Date(p1.valueOf() * 24 * 60 * 60 * 1000);
    } else {
      throw new TypeError("invalid argument");
    }
  }

  getYear(): number {
    return this.date.getUTCFullYear();
  }

  setYear(year: number, month?: number, date?: number): number {
    this.date.setUTCFullYear(year);
    if (month != null) this.date.setUTCMonth(month);
    if (date != null) this.date.setUTCDate(date);
    return this.valueOf();
  }

  getMonth(): number {
    return this.date.getUTCMonth();
  }

  setMonth(month: number, date?: number): number {
    this.date.setUTCMonth(month);
    if (date != null) this.date.setUTCDate(date);
    return this.valueOf();
  }

  getDate(): number {
    return this.date.getDate();
  }

  setDate(date: number): number {
    this.date.setUTCDate(date);
    return this.valueOf();
  }

  getDay(): number {
    return this.date.getDay();
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
    return Math.floor(this.date.getTime() / 1000 / 60 / 60 / 24);
  }

  toString(): string {
    return `${this.toYear().toString()}-${this.toMonth().toString()}-${`0${this.getDate().toString()}`.slice(
      -2
    )}`;
  }

  toYear(): Year {
    return new Year(this.getYear());
  }

  toMonth(): Month {
    return new Month(this.getMonth());
  }
}

export default Day;
