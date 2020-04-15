import {
  genArray,
  getSplitPoints,
  pushArray,
  getUpPointsNb,
  getDownPointsNb,
  getLeftPointsNb,
  getRightPointsNb,
} from './utils';

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

  return data.features.map( feature => 
    {const result = pointsToTest.filter( point => isPointInside(point,feature))
  return result}
  )

}

//Final function
export default function split(data, gridSize) {
  const splitPointsData = addSplitPointsAll(data, gridSize);
  const newData = {
    ...data,
    features: splitPointsData,
  }
  const intersectionPoints = generateIntersectionPoints(newData, gridSize);
  const testblob = [90,20];
  return [newData];
}