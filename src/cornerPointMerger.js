/* 
  This final method is a better alternative to the edge case or classic merger
  Is uses the property of corner point and virtual corner point which are known 
  respectively inside or outide a polygon
*/

import {
  includeArr,
  pushArray,
  distance,
  arePointsEqual,
  substractArr,
  substractPoints,
} from './utils';

import {
  splitSquareSide2
} from './pointUtils';

function orderCornerPoints(minX, maxX, minY, maxY, cornerPointSubset) {
  const result = [];
  if (includeArr(cornerPointSubset, [maxX, minY])) { result.push([maxX, minY]) }
  if (includeArr(cornerPointSubset, [maxX, maxY])) { result.push([maxX, maxY]) }
  if (includeArr(cornerPointSubset, [minX, maxY])) { result.push([minX, maxY]) }
  if (includeArr(cornerPointSubset, [minX, minY])) { result.push([minX, minY]) }
  return result;
}

function findNextPoint(origin, minX, maxX, minY, maxY, pointSubset, orderedCornerPoints) {
  //Build an array of candidates
  let pointsToCheck = [];
  pointSubset.map(path => {
    pointsToCheck.push(path[0]);
    if (path.length > 1) {
      pointsToCheck.push(path[path.length - 1]);
    }
  })
  pushArray(pointsToCheck, orderedCornerPoints);
  const side = splitSquareSide2(minX, maxX, minY, maxY, origin);
  pointsToCheck = pointsToCheck.filter(point => {
    switch (side) {
      case 'left':
        return point[0] === minX && point[1] > origin[1]
      case 'right':
        return point[0] === maxX && point[1] < origin[1]
      case 'bottom':
        return point[1] === minY && point[0] < origin[0]
      case 'top':
        return point[1] === maxY && point[0] > origin[0]
    }
  })

  //Early return if no candidates
  if (pointsToCheck.length === 0) {
    return null;
  }

  //Find the closest point
  let closestPoint;
  let smallestDistance;
  pointsToCheck.map(point => {
    if (!closestPoint) {
      smallestDistance = distance(origin, point)
      closestPoint = point
    } else if (distance(origin, point) < smallestDistance) {
      smallestDistance = distance(origin, point)
      closestPoint = point
    }
  })

  return closestPoint;
}

function pushToPathAndReturnNext(newPath, closestPoint, pointSubset, orderedCornerPoints) {
  //Handles if closestPoint is in a path
  let pointsToAdd = [];
  pointSubset.map((path, idx) => {
    if (arePointsEqual(path[0], closestPoint)) {
      pointsToAdd = pointSubset[idx]
      pointSubset.splice(idx, 1)
    } else if (arePointsEqual(path[path.length - 1], closestPoint)) {
      pointsToAdd = pointSubset[idx].reverse()
      pointSubset.splice(idx, 1)
    }
  })

  if (pointsToAdd.length > 0) {
    pushArray(newPath, pointsToAdd)
    return pointsToAdd[pointsToAdd.length - 1]
  }

  //Handles if closestPoint is a cornerPoint
  if (includeArr(orderedCornerPoints, closestPoint)) {
    substractPoints(orderedCornerPoints, [closestPoint])
    pushArray(newPath, [closestPoint])
    return closestPoint
  }
}

export function buildPath(start, minX, maxX, minY, maxY, pointSubset, orderedCornerPoints) {
  let newPath = [];
  let currentPoint = start;
  newPath.push(start)


  while (currentPoint) {
    const closestPoint = findNextPoint(currentPoint, minX, maxX, minY, maxY, pointSubset, orderedCornerPoints);
    currentPoint = closestPoint
      ? pushToPathAndReturnNext(newPath, closestPoint, pointSubset, orderedCornerPoints)
      : null;
  }
  return newPath;
}

export function cornerPointMerger(minX, maxX, minY, maxY, pointSubset, cornerPointSubset) {
  //Early returns
  if (pointSubset.length === 0 && cornerPointSubset.length === 0) return pointSubset; //Empty area

  const newSubset = []
  const orderedCornerPoints = orderCornerPoints(minX, maxX, minY, maxY, cornerPointSubset);

  //If there's corner points, bind all related polygons until there's no unused corner point left
  if (orderedCornerPoints.length > 0) {
    while (orderedCornerPoints.length > 0) {
      const start = orderedCornerPoints.pop();
      const newPath = buildPath(start, minX, maxX, minY, maxY, pointSubset, orderedCornerPoints);
      newSubset.push(newPath)
    }
  }
  if (pointSubset.length === 0 && orderedCornerPoints.length === 0) return newSubset;

  //Handles path exclusive polygons
  if (pointSubset.length > 0 && orderedCornerPoints.length === 0) {

    return newSubset;
  }
}

//Need a function to remove excluded adjacent path