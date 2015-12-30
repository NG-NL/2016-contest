function Cell(value) {
  this.value = (value !== undefined ? value : 1);
  this.suggest = false;
}

Cell.prototype.toggle = function () {
  this.value = (this.value + 1) % 3;
  this.suggest = false;
};

Cell.prototype.toString = function () {
  return String(this.value);
};

module.exports = Cell;