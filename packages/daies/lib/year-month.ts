import Year from "./year";
import Month from "./month";
import YearData from "./year-data";
import MonthData from "./month-data";

function getYear(value: number): number {
  return Math.floor(value / 12) + 1970;
}

function getMonth(value: number): number {
  return value % 12;
}

// 1970-01 => 0
// 1970-12 => 11
// 1971-01 => 12
function getValue(year: YearData, month: MonthData): number {
  return (year.getYear() - 1970) * 12 + month.getMonth();
}

class YearMonth implements YearData, MonthData {
  private value: number;

  constructor(year: number, month: number);
  constructor(value: number | string | YearMonth);
  constructor(p1: number | string | YearMonth, p2?: number) {
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
    } else {
      this.value = p1.valueOf();
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
    return this.getMonth();
  }

  getYear(): number {
    return getYear(this.value);
  }

  setYear(year: number, month?: number): number {
    const newYearMonth = new YearMonth(year, month ?? this.getMonth());
    this.value = newYearMonth.valueOf();
    return this.getYear();
  }

  diff(yearMonth: YearData & MonthData): number {
    return this.valueOf() - getValue(yearMonth, yearMonth);
  }

  valueOf(): number {
    return this.value;
  }
}

export default YearMonth;
