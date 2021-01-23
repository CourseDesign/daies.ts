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

export type YearLike = number | string | Year;

class Year {
  private value: number;

  constructor(value: YearLike) {
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

  diff(year: YearLike): number {
    return this.valueOf() - new Year(year).valueOf();
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
