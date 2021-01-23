import YearData from "./year-data";

function calculateYear(value: number | string): number {
  const parsed = Number(value);
  if (parsed < 0) {
    throw new TypeError("value must be greater than 0");
  }
  if (parsed >= 0 && parsed < 100) {
    return parsed + 1900;
  }
  return parsed;
}

class Year implements YearData {
  private value: number;

  constructor(value: number | string | Year) {
    if (value instanceof Year) {
      this.value = value.getYear();
    } else {
      this.value = calculateYear(value);
    }
  }

  getYear(): number {
    return this.value;
  }

  setYear(year: number): number {
    this.value = calculateYear(year);
    return this.value;
  }

  getDays(): number {
    let total = 0;
    for (let month = 0; month < 12; month += 1) {
      total += new Date(this.getYear(), month, 0).getDate();
    }
    return total;
  }

  diff(year: YearData): number {
    return this.valueOf() - year.getYear();
  }

  subtract(value: number): Year {
    this.value = calculateYear(this.value - value);
    return this;
  }

  add(value: number): Year {
    this.value = calculateYear(this.value + value);
    return this;
  }

  valueOf(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

export default Year;
