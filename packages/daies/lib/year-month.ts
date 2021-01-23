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

export type YearMonthLike = number | string | YearMonth;

class YearMonth {
  private value: number;

  constructor(year: YearLike, month: MonthLike);
  constructor(value: YearMonthLike);
  constructor(p1: YearLike | YearMonthLike, p2?: MonthLike) {
    if (p2 != null) {
      this.value = getValue(new Year(p1 as never), new Month(p2));
    } else if (typeof p1 === "number") {
      this.value = p1;
    } else if (typeof p1 === "string") {
      const date = new Date(p1);
      this.value = getValue(
        new Year(date.getUTCFullYear()),
        new Month(date.getUTCMonth())
      );
    } else if (p1 instanceof YearMonth) {
      this.value = p1.valueOf();
    } else {
      throw new TypeError("invalid argument");
    }
  }

  toString(): string {
    return `${this.toYear().toString()}-${this.toMonth().toString()}`;
  }

  toYear(): Year {
    return new Year(this.getYear());
  }

  toMonth(): Month {
    return new Month(this.getMonth());
  }

  getDays(): number {
    return new Date(this.getYear(), this.getMonth(), 0).getDate();
  }

  getMonth(): number {
    return getMonth(this.value);
  }

  setMonth(month: number): number {
    const newYearMonth = new YearMonth(this.getYear(), month);
    this.value = newYearMonth.valueOf();
    return this.valueOf();
  }

  getYear(): number {
    return getYear(this.value);
  }

  setYear(year: number, month?: number): number {
    const newYearMonth = new YearMonth(year, month ?? this.getMonth());
    this.value = newYearMonth.valueOf();
    return this.valueOf();
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
    return this.value;
  }
}

export default YearMonth;
