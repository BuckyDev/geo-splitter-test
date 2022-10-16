export function randomColor() {
  return `rgb(${Math.floor(Math.random() * 205) + 50},${
    Math.floor(Math.random() * 205) + 50
  },${Math.floor(Math.random() * 205) + 50})`;
}
