const getTileCoords = ({
  currentX,
  currentTileWidth,
  currentY,
  equatorialTileSize
}) => {
  return [
    [
      currentX,
      currentY
    ],
    [
      currentX + currentTileWidth,
      currentY
    ],
    [
      currentX + currentTileWidth,
      currentY + equatorialTileSize
    ],
    [
      currentX,
      currentY + equatorialTileSize
    ],
  ]
}

export const generateGOGrid = ({equatorialTileSize, mapHeight, mapWidth}) => {
  const transitionIterations = Math.log(mapWidth/equatorialTileSize) / Math.log(4) - 1
  const rowsNumber = mapHeight / equatorialTileSize;

  let currentX = 0;
  let currentY = 0;
  let currentRow = 0;
  let currentTileWidth = mapWidth/4;
  const tiles = [];

  const safety = 6000;
  let idx = 0;

  while(
    (currentX + currentTileWidth < mapWidth ||
      currentY < mapHeight
    ) && idx < safety
  ) {
    idx++
    tiles.push(getTileCoords({
      currentX,
      currentTileWidth,
      currentY,
      equatorialTileSize
    }))

    // Update values for next iterations
    if(currentX + currentTileWidth >= mapWidth){
      currentX = 0
      currentY += equatorialTileSize
      // Compute next currentTileWidth
      if(currentRow < transitionIterations) {
        currentTileWidth /= 4;
      } else if(currentRow + 1 >= rowsNumber - transitionIterations) {
        currentTileWidth *= 4;
      }
      currentRow ++;
    } else {
      currentX += currentTileWidth
    }
  }

  return tiles
}
