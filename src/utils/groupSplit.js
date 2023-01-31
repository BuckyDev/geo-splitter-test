import { genArray } from "./genArray";

const bigSquares = ({ xMin, xMax, yMin, yMax, gridSize }) =>
  genArray(xMin, xMax, gridSize * 2)
    .slice(0, -1)
    .map((xCoord) =>
      genArray(yMin, yMax, gridSize * 2).map((yCoord) => [
        `${xCoord}_${yCoord}`,
        `${xCoord + gridSize}_${yCoord}`,
        `${xCoord}_${yCoord + gridSize}`,
        `${xCoord + gridSize}_${yCoord + gridSize}`,
      ])
    )
    .flat();

const horizontalTwins = ({ xMin, xMax, yMin, yMax, gridSize }) =>
  genArray(xMin, xMax, gridSize * 2)
    .slice(0, -1)
    .map((xCoord) =>
      genArray(yMin, yMax, gridSize).map((yCoord) => [
        `${xCoord}_${yCoord}`,
        `${xCoord + gridSize}_${yCoord}`,
      ])
    )
    .flat();

const verticalLines = ({ xMin, xMax, yMin, yMax, gridSize }) =>
  genArray(xMin, xMax, gridSize)
    .slice(0, -1)
    .map((xCoord) =>
      genArray(yMin, yMax, gridSize).map((yCoord) => `${xCoord}_${yCoord}`)
    );

const horizontalLines = ({ xMin, xMax, yMin, yMax, gridSize }) =>
  genArray(yMin, yMax, gridSize)
    .slice(0, -1)
    .map((yCoord) =>
      genArray(xMin, xMax, gridSize).map((xCoord) => `${xCoord}_${yCoord}`)
    );

const doubleHorizontalLines = ({ xMin, xMax, yMin, yMax, gridSize }) =>
  genArray(yMin, yMax, gridSize * 2).map((yCoord) =>
    [
      genArray(xMin, xMax, gridSize).map((xCoord) => `${xCoord}_${yCoord}`),
      genArray(xMin, xMax, gridSize).map(
        (xCoord) => `${xCoord}_${yCoord + gridSize}`
      ),
    ].flat()
  );

export function groupSplit({ splitData, xMin, xMax, yMin, yMax, gridSize }) {
  const gridModel = doubleHorizontalLines({ xMin, xMax, yMin, yMax, gridSize });

  return gridModel.map((tileIds) =>
    splitData.filter((featureCollection) =>
      featureCollection.features.some((polygon) =>
        tileIds.includes(polygon.properties.zone)
      )
    )
  );
}
