export class Keyboard {
  keys = [
    "c",
    "",
    "",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    "",
    ".",
    "=",
  ];

  /**
   * @param {String} value
   * @returns {Boolean}
   */
  isvalidKey(value) {
    return this.keys.filter((key) => key !== "").includes(value);
  }
}
