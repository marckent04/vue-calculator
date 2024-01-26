import { describe, it, beforeEach, expect } from "vitest";
import { Calculator } from "./calculator";

describe("Calculator", () => {
  /**
   * @type {Calculator}
   */
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should add new number", () => {
    calculator.addEntry("10");
    expect(calculator.entries).toEqual(["10"]);
  });

  it("should can add operator because entries have a number", () => {
    calculator.addEntry("10");
    calculator.addEntry("+");

    expect(calculator.getCalulation()).toEqual("10+");
  });

  it("should can't add operator because entries is empty", () => {
    calculator.addEntry("+");
    calculator.addEntry("/");
    calculator.addEntry("*");
    expect(calculator.entries).toHaveLength(0);
  });

  it("should replace operator because last entry is an operator", () => {
    calculator.addEntry("20");
    calculator.addEntry("+");
    calculator.addEntry("*");
    expect(calculator.getCalulation()).toEqual("20*");
  });

  it("should calculate ", () => {
    const entries = ["2", "0", "+", "2", "-", "1", "0", "-", "2"];

    entries.forEach((entry) => {
      calculator.addEntry(entry);
    });

    expect(calculator.calculate()).toEqual(10);
  });

  it("should clear entries", () => {
    calculator.addEntry("20");
    calculator.addEntry("+");
    calculator.addEntry("2");

    calculator.clear();

    expect(calculator.entries).toHaveLength(0);
    expect(calculator.operatorEntries).toHaveLength(0);
  });

  it("should add entry because minus is after operator", () => {
    calculator.addEntry("2");
    calculator.addEntry("*");
    calculator.addEntry("-");
    calculator.addEntry("1");

    expect(calculator.entries).toHaveLength(4);
    expect(calculator.calculate()).toEqual(-2);
  });

  it(`should not add many "." in the same number`, () => {
    calculator.addEntry("2");
    calculator.addEntry("*");
    calculator.addEntry("1");
    calculator.addEntry(".");
    calculator.addEntry("5");
    calculator.addEntry(".");
    calculator.addEntry("3");
    calculator.addEntry(".");
    calculator.addEntry("2");

    expect(calculator.getCalulation()).toEqual("2*1.532");
    expect(calculator.entries.join("")).toEqual("2#1.532");
  });
});
