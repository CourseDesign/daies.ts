import Year from "./year";
import Month from "./month";
import YearData from "./year-data";
import MonthData from "./month-data";
import DateData from "./date-data";

class Day implements YearData, MonthData, DateData {
  private date: Date;

  constructor(year: number, month: number, day: number);
  constructor(value: number | string | Day);
  constructor(p1: number | string | Day, p2?: number, p3?: number) {
    if (p2 != null && p3 != null) {
      this.date = new Date(Date.UTC(p1 as number, p2, p3));
    } else if (typeof p1 === "number") {
      this.date = new Date(p1 * 24 * 60 * 60 * 1000);
    } else if (typeof p1 === "string") {
      this.date = new Date(p1);
      this.date.setUTCHours(0, 0, 0, 0);
    } else {
      this.date = new Date(p1.valueOf() * 24 * 60 * 60 * 1000);
    }
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

  getYear(): number {
    return this.date.getUTCFullYear();
  }

  setYear(year: number, month?: number, date?: number): number {
    this.date.setUTCFullYear(
      year,
      month ?? this.getMonth(),
      date ?? this.getDate()
    );
    return this.getYear();
  }

  getMonth(): number {
    return this.date.getUTCMonth();
  }

  setMonth(month: number, date?: number): number {
    this.date.setUTCMonth(month, date ?? this.getDate());
    return this.getMonth();
  }

  getDate(): number {
    return this.date.getUTCDate();
  }

  setDate(date: number): number {
    this.date.setUTCDate(date);
    return this.getDate();
  }

  getDay(): number {
    return this.date.getUTCDay();
  }

  diff(date: YearData & MonthData & DateData): number {
    return (
      this.valueOf() -
      new Day(date.getYear(), date.getMonth(), date.getDate()).valueOf()
    );
  }

  valueOf(): number {
    return Math.floor(this.date.getTime() / 1000 / 60 / 60 / 24);
  }
}

export default Day;
