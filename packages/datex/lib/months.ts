import Month from "./month";

export class ImmutableMonth extends Month {
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  setMonth(month: number): number {
    throw new Error("Cant change");
  }

  subtract(value: number): Month {
    return new Month(this.valueOf() - value);
  }

  add(value: number): Month {
    return new Month(this.valueOf() + value);
  }
}

export const JANUARY = new ImmutableMonth(0);
export const FEBRUARY = new ImmutableMonth(1);
export const MARCH = new ImmutableMonth(2);
export const APRIL = new ImmutableMonth(3);
export const MAY = new ImmutableMonth(4);
export const JUNE = new ImmutableMonth(5);
export const JULY = new ImmutableMonth(6);
export const AUGUST = new ImmutableMonth(7);
export const SEPTEMBER = new ImmutableMonth(8);
export const OCTOBER = new ImmutableMonth(9);
export const NOVEMBER = new ImmutableMonth(10);
export const DECEMBER = new ImmutableMonth(11);
