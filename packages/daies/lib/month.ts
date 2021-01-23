import MonthData from "./month-data";

function calculateMonth(value: number | string): number {
  const parsed = typeof value === "string" ? Number(value) - 1 : value;
  return (parsed + 12) % 12;
}

class Month implements MonthData {
  private value: number;

  constructor(value: number | string | Month) {
    if (value instanceof Month) {
      this.value = value.getMonth();
    } else {
      this.value = calculateMonth(value);
    }
  }

  getMonth(): number {
    return this.value;
  }

  setMonth(month: number): number {
    this.value = calculateMonth(month);
    return this.value;
  }

  diff(month: MonthData): number {
    return this.valueOf() - month.getMonth();
  }

  subtract(value: number): Month {
    this.value = calculateMonth(this.value - value);
    return this;
  }

  add(value: number): Month {
    this.value = calculateMonth(this.value + value);
    return this;
  }

  valueOf(): number {
    return this.value;
  }

  toString(): string {
    return `0${(this.value + 1).toString()}`.slice(-2);
  }
}

export default Month;
