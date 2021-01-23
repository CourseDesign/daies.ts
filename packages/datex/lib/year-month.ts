import Year, { YearLike } from "./year";
import Month, { MonthLike } from "./month";

function getYear(value: number): number {
  return Math.floor(value / 12) + 1970;
}

function getMonth(value: number): number {
  return value % 12;
}

// 1970-01 => 0
// 1970-12 => 11
// 1971-01 => 12
function getValue(year: Year, month: Month): number {
  return (year.getYear() - 1970) * 12 + month.getMonth();
}

class YearMonth {
  private readonly year: Year;

  private readonly month: Month;

  constructor(year: YearLike, month: MonthLike);
  constructor(value: number | string);
  constructor(p1: YearLike | number | string, p2?: MonthLike) {
    if (p2 != null) {
      this.year = new Year(p1);
      this.month = new Month(p2);
    } else if (typeof p1 === "number") {
      this.year = new Year(getYear(p1));
      this.month = new Month(getMonth(p1));
    } else if (typeof p1 === "string") {
      const date = new Date(p1);
      this.year = new Year(date.getFullYear());
      this.month = new Month(date.getMonth());
    } else {
      throw new TypeError("invalid argument");
    }
  }

  getYear(): number {
    return this.year.getYear();
  }

  setYear(year: number, month?: number): number {
    this.year.setYear(year);
    if (month != null) this.month.setMonth(month);
    return this.valueOf();
  }

  getMonth(): number {
    return this.month.getMonth();
  }

  setMonth(month: number): number {
    this.month.setMonth(month);
    return this.valueOf();
  }

  getDays(): number {
    return new Date(this.getYear(), this.getMonth(), 0).getDate();
  }

  diff(year: YearLike, month: MonthLike): number;
  diff(value: number | string | YearMonth): number;
  diff(p1: YearLike | YearMonth, p2?: MonthLike): number {
    return (
      this.valueOf() -
      (p1 instanceof YearMonth ? p1 : new YearMonth(p1, p2 as never)).valueOf()
    );
  }

  valueOf(): number {
    return getValue(this.year, this.month);
  }

  toString(): string {
    return `${this.year}-${this.month}`;
  }

  toYear(): Year {
    return new Year(this.year);
  }

  toMonth(): Month {
    return new Month(this.month);
  }
}

export default YearMonth;
