import {
  genArray,
  getSplitPoints,
  pushArray,
  mapFrom,
} from './utils';

import {
  getUpPointsNb,
  getDownPointsNb,
  getLeftPointsNb,
  getRightPointsNb,
  isEntryPoint,
  isBouncePoint,
  isInSquare,
  isInnerCorner,
  isInCorner,
} from './pointUtils';

import {
  cornerPointMerger
} from './cornerPointMerger';

//Add all missing crossborder points for a polygon
function addSplitPointFeature(coordinates, gridSize) {
  const updatedCoordinates = [];
  coordinates.map(coordinate => {
    const result = [];
    coordinate.map((coord1, idx) => {
      if (
        idx === coordinate.length - 1 &&
        coordinate[idx] === coordinate[0]
      ) {
        return null;
      }
      const coord2 = coordinate[idx + 1] || coordinate[0];
      const extraPoints = getSplitPoints([coord1, coord2], gridSize);

      result.push(coord1)
      pushArray(result, extraPoints)
    })
    updatedCoordinates.push(result)
  })
  return updatedCoordinates;
}

function addSplitPointsAll(data, gridSize) {
  return data.features.map(feature => {
    const enrichedCoordinates = addSplitPointFeature(feature.geometry.coordinates, gridSize);
    return {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: enrichedCoordinates
      }
    }
  })
}

//Generate a collection of points located at an intersection and inside the polygon
function isPointInside(testPoint, feature) {
  const featurePoints = feature.geometry.coordinates;
  return featurePoints.map(polygonPoints => {
    const isInUp = getUpPointsNb(testPoint, polygonPoints) % 2 === 1;
    const isInDown = getDownPointsNb(testPoint, polygonPoints) % 2 === 1;
    const isInLeft = getLeftPointsNb(testPoint, polygonPoints) % 2 === 1;
    const isInRight = getRightPointsNb(testPoint, polygonPoints) % 2 === 1;
    return isInUp && isInDown && isInLeft && isInRight;
  }).includes(true);
}

function generateIntersectionPoints(data, gridSize) {
  const pointsToTest = []
  genArray(0, 100, gridSize).map(x => {
    genArray(0, 50, gridSize).map(y => {
      pointsToTest.push([x, y])
    })
  })

  return data.features.map(feature => {
    const result = pointsToTest.filter(point => isPointInside(point, feature))
    return result
  }
  )
}

//Generate the subset for a square area
function generatePointSubset(minX, maxX, minY, maxY, coordinates) {
  const pointSubset = [];
  coordinates.map(polygonPoints => {
    const start = polygonPoints.findIndex((point, idx) => {
      const prevPoint = polygonPoints[idx === 0 ? polygonPoints.length - 1 : idx - 1]
      const nextPoint = polygonPoints[idx === polygonPoints.length - 1 ? 0 : idx + 1]
      return isEntryPoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint);
    })
    if (start === -1) {
      if (polygonPoints.every(point => isInSquare(minX, maxX, minY, maxY, point))) {
        pointSubset.push(polygonPoints);
      }
      return null;
    }
    let currentPathIdx = -1
    mapFrom(polygonPoints, start, (pt, idx) => {
      const point = polygonPoints[idx]
      const prevPoint = polygonPoints[idx === 0 ? polygonPoints.length - 1 : idx - 1]
      const nextPoint = polygonPoints[idx === polygonPoints.length - 1 ? 0 : idx + 1]

      if (isEntryPoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint)) {
        pointSubset.push([point]);
        currentPathIdx++;
      } else if (
        isInCorner(minX, maxX, minY, maxY, point) &&
        !isInnerCorner(minX, maxX, minY, maxY, point, polygonPoints)
      ) {
        return null;
      } else if (
        isInCorner(minX, maxX, minY, maxY, point) &&
        isBouncePoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint) &&
        isInnerCorner(minX, maxX, minY, maxY, point, polygonPoints)
      ) {
        pointSubset.push([point]);
        currentPathIdx++;
      } else if (
        !isInCorner(minX, maxX, minY, maxY, point) &&
        isBouncePoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint)
      ) {
        return null;
      } else if (isInSquare(minX, maxX, minY, maxY, point)) {
        pointSubset[currentPathIdx].push(point);
      }
    })
  })
  return pointSubset;
}

function generateCornerPointsSubset(minX, maxX, minY, maxY, cornerPoints) {
  return cornerPoints.filter(point => isInSquare(minX, maxX, minY, maxY, point))
}

function buildAreaSplit(newData, cornerPoints, gridSize) {
  const areas = [];
  genArray(0, 90, gridSize).map(x => {
    genArray(0, 40, gridSize).map(y => {
      const newFeatures = newData.features.map((feature, idx) => {
        const cornerPointSubset = generateCornerPointsSubset(x, x + gridSize, y, y + gridSize, cornerPoints[idx]);
        const pointSubset = generatePointSubset(x, x + gridSize, y, y + gridSize, feature.geometry.coordinates);
        const finalCoordinates = cornerPointMerger(x, x + gridSize, y, y + gridSize, pointSubset, cornerPointSubset, feature.geometry.coordinates);
        return {
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: finalCoordinates
          }
        }
      })
      areas.push({
        ...newData,
        features: newFeatures
      })
    })
  })
  return areas;
}

//Final function
export default function split(data, gridSize) {
  const splitPointsData = addSplitPointsAll(data, gridSize);
  const newData = {
    ...data,
    features: splitPointsData,
  }
  const intersectionPoints = generateIntersectionPoints(newData, gridSize);
  let splittedData = [newData]
  try {
    splittedData = buildAreaSplit(newData, intersectionPoints, gridSize);
    console.log(splittedData[17].features[8].geometry)
  } catch (e) {
    console.error(e)
  }
  return splittedData;
}
