import Year from "./year";
import YearMonth from "./year-month";
import Month from "./month";

describe("YearMonth", () => {
  test("constructor", () => {
    expect(new YearMonth(0).toString()).toEqual("1970-01");
    expect(new YearMonth("1970-02").toString()).toEqual("1970-02");
    expect(new YearMonth("1970", "03").toString()).toEqual("1970-03");
    expect(new YearMonth(new Year("1970"), "04").toString()).toEqual("1970-04");
    expect(new YearMonth(new Year("1970"), new Month("05")).toString()).toEqual(
      "1970-05"
    );
  });

  test("getYear", () => {
    expect(new YearMonth("1970-02").getYear()).toEqual(1970);
  });

  test("setYear", () => {
    const year = new YearMonth("1970-02");
    year.setYear(1971);
    expect(year.getYear()).toEqual(1971);
  });

  test("getMonth", () => {
    expect(new YearMonth("1970-02").getMonth()).toEqual(1);
  });

  test("setMonth", () => {
    const year = new YearMonth("1970-02");
    year.setMonth(11);
    expect(year.getMonth()).toEqual(11);
  });

  test("getDays", () => {
    expect(new YearMonth("1970-02").getDays()).toEqual(31);
  });

  test("diff", () => {
    expect(new YearMonth("1970-02").diff(new YearMonth("1971-02"))).toEqual(
      -12
    );
  });

  test("valueOf", () => {
    expect(new YearMonth("1970-02").valueOf()).toEqual(1);
  });

  test("toString", () => {
    expect(new YearMonth("1970-02").toString()).toEqual("1970-02");
  });

  test("toYear", () => {
    expect(new YearMonth("1970-02").toYear().toString()).toEqual("1970");
  });

  test("toMonth", () => {
    expect(new YearMonth("1970-02").toMonth().toString()).toEqual("02");
  });
});
