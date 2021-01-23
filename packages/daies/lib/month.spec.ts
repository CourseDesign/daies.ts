import Month from "./month";

describe("Month", () => {
  test("constructor", () => {
    expect(() => new Month(-1)).toThrow(TypeError);
    expect(() => new Month(12)).toThrow(TypeError);

    expect(new Month(1).getMonth()).toEqual(1);
    expect(new Month("1").getMonth()).toEqual(0);
  });

  test("getMonth", () => {
    expect(new Month(1).getMonth()).toEqual(1);
  });

  test("setMonth", () => {
    expect(new Month(1).setMonth(11)).toEqual(11);
  });

  test("compare", () => {
    expect(new Month(11) > new Month(10)).toEqual(true);
    expect(new Month(11) < new Month(10)).toEqual(false);
  });

  test("diff", () => {
    expect(new Month(11).diff(new Month(10))).toEqual(1);
    expect(new Month(10).diff(new Month(11))).toEqual(-1);
  });

  test("add", () => {
    expect(new Month(10).add(1).getMonth()).toEqual(11);
  });

  test("subtract", () => {
    expect(new Month(11).subtract(1).getMonth()).toEqual(10);
  });

  test("toString", () => {
    expect(new Month("1").toString()).toEqual("01");
  });

  test("valueOf", () => {
    expect(new Month("1").valueOf()).toEqual(0);
  });
});
