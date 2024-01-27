export class Calculator {
  /**
   * @type {String[]}
   */
  entries = [];

  /**
   * @type {String[]}
   */
  operatorEntries = [];

  /**
   * @type {String[]}
   */
  operators = ["+", "*", "/", "-"];

  /**
   *
   * @param {String} value
   * @returns {void}
   */
  addEntry(value) {
    if (value === "-") {
      return this.handleMinusCase();
    }

    if (value === ".") {
      return this.handleCommaCase();
    }

    if (this.operators.includes(value)) {
      return this.handleOperatorCase(value);
    }

    this.entries.push(value);
  }

  handleOperatorCase(value) {
    if (!this.entries.length) {
      return;
    }

    if (this.isLastEntryIsOperator()) {
      this.operatorEntries[this.operatorEntries.length - 1] = value;
      return;
    }

    this.addOperator(value);
  }

  addOperator(operator) {
    this.entries.push(this.getOperatorWildcard());
    this.operatorEntries.push(operator);
  }

  handleMinusCase() {
    const isLastEntryMinus =
      this.isLastEntryIsOperator() && this.getLastOperatorEntry() === "-";

    if (!isLastEntryMinus || !this.entries.length) {
      this.addOperator("-");
      return;
    }

    if (this.isLastEntryIsOperator()) {
      this.operatorEntries[this.operatorEntries.length - 1] = "-";
    }
  }

  handleCommaCase() {
    const lastOperatorIndex = this.entries.lastIndexOf(
      this.getOperatorWildcard(),
    );

    const isLastNumberContainsComma = this.entries
      .slice(lastOperatorIndex + 1)
      .includes(".");

    if (
      !this.getCalulation().length ||
      this.isLastEntryIsOperator() ||
      isLastNumberContainsComma
    ) {
      return;
    }

    this.entries.push(".");
  }

  /**
   *
   * @returns {number}
   */
  calculate() {
    const result = eval(this.getCalulation());
    this.clear();
    this.entries = [result.toString()];
    return result;
  }

  getCalulation() {
    let calulation = this.entries.reduce((p, c) => `${p}${c}`, "");

    this.operatorEntries.forEach((op) => {
      calulation = calulation.replace(this.getOperatorWildcard(), op);
    });

    return calulation;
  }

  clear() {
    this.entries = [];
    this.operatorEntries = [];
  }

  /**
   * @returns {boolean}
   */
  isLastEntryIsOperator() {
    return this.entries[this.entries.length - 1] === this.getOperatorWildcard();
  }

  /**
   * @returns {String}
   */
  getLastOperatorEntry() {
    if (this.operatorEntries.length)
      return this.operatorEntries[this.operatorEntries.length - 1];
  }

  getOperatorWildcard() {
    return "#";
  }
}
