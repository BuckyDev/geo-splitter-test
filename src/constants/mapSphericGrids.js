export const mapDimensions = {
  xMin: -180,
  yMin: -90,
  xMax: 180,
  yMax: 90,
  latRatio: 4,
};

export const mapSphericGrid = {
  c: { gridSize: 22.5, ...mapDimensions },
  l: { gridSize: 5.625, ...mapDimensions },
  i: { gridSize: 1.40625, ...mapDimensions },
  h: { gridSize: 0.3515625, ...mapDimensions },
  f: { gridSize: 0.087890625, ...mapDimensions },
};
