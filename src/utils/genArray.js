export function genArray(start, stop, diff) {
  const arr = [];
  let value = start;
  while (value <= stop) {
    arr.push(value);
    value += diff;
  }
  return arr;
}
