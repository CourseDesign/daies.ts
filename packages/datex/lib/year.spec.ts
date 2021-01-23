import Year from "./year";

describe("Year", () => {
  test("constructor", () => {
    expect(() => new Year(-1)).toThrow(TypeError);
    expect(new Year(0).getYear()).toEqual(1900);
    expect(new Year(99).getYear()).toEqual(1999);
    expect(new Year(2020).getYear()).toEqual(2020);

    expect(() => new Year("-1")).toThrow(TypeError);
    expect(new Year("0").getYear()).toEqual(1900);
    expect(new Year("99").getYear()).toEqual(1999);
    expect(new Year("2020").getYear()).toEqual(2020);
  });

  test("getYear", () => {
    expect(new Year("2020").getYear()).toEqual(2020);
  });

  test("setYear", () => {
    expect(new Year(0).setYear(2000)).toEqual(2000);
  });

  test("compare", () => {
    expect(new Year(2020) > new Year(2019)).toEqual(true);
    expect(new Year(2020) < new Year(2019)).toEqual(false);
  });

  test("diff", () => {
    expect(new Year(2020).diff(new Year(2019))).toEqual(1);
    expect(new Year(2019).diff(new Year(2020))).toEqual(-1);
  });

  test("add", () => {
    expect(new Year(2020).add(1).getYear()).toEqual(2021);
  });

  test("subtract", () => {
    expect(new Year(2020).subtract(1).getYear()).toEqual(2019);
  });

  test("toString", () => {
    expect(new Year("2020").toString()).toEqual("2020");
  });

  test("valueOf", () => {
    expect(new Year("2020").valueOf()).toEqual(2020);
  });
});
