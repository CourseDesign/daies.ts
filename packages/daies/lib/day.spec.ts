import Day from "./day";

describe("Day", () => {
  test("constructor", () => {
    expect(new Day(0).toString()).toEqual("1970-01-01");
    expect(new Day(1).toString()).toEqual("1970-01-02");
    expect(new Day(31).toString()).toEqual("1970-02-01");
  });

  test("getYear", () => {
    expect(new Day("1970-01-01").getYear()).toEqual(1970);
    expect(new Day("1971-01-02").getYear()).toEqual(1971);
  });

  test("setYear", () => {
    const day = new Day("1970-02");
    day.setYear(1971);
    expect(day.getYear()).toEqual(1971);
  });

  test("getMonth", () => {
    expect(new Day("1970-01-01").getMonth()).toEqual(0);
    expect(new Day("1971-04-02").getMonth()).toEqual(3);
  });

  test("setYear", () => {
    const day = new Day("1970-02");
    day.setMonth(0);
    expect(day.getMonth()).toEqual(0);
  });

  test("diff", () => {
    expect(new Day("1970-02-01").diff(new Day("1971-03-01"))).toEqual(-396);
  });

  test("valueOf", () => {
    expect(new Day("1970-01-01").valueOf()).toEqual(0);
    expect(new Day("1970-01-02").valueOf()).toEqual(1);
    expect(new Day("1970-02-01").valueOf()).toEqual(31);
  });

  test("toString", () => {
    expect(new Day("1970-01-01").toString()).toEqual("1970-01-01");
    expect(new Day("1970-01-02").toString()).toEqual("1970-01-02");
    expect(new Day("1970-02-01").toString()).toEqual("1970-02-01");
  });

  test("toYear", () => {
    expect(new Day("1970-01-01").toYear().toString()).toEqual("1970");
    expect(new Day("1971-01-01").toYear().toString()).toEqual("1971");
  });

  test("toMonth", () => {
    expect(new Day("1970-01-01").toMonth().toString()).toEqual("01");
    expect(new Day("1971-05-01").toMonth().toString()).toEqual("05");
  });
});
