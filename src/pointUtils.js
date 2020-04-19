import {
  includeArr,
  min,
  max,
  findPointIndex,
  mapFrom,
  arePointsEqual,
} from './utils'

//If a point is on a grid line
export function isSplitPoint(point, gridSize) {
  return point[0] % gridSize === 0 || point[1] % gridSize === 0
};

export function isOnSquareSide(minX, maxX, minY, maxY, point) {
  const validCoord = [minX, maxX, minY, maxY];
  return validCoord.includes(point[0]) || validCoord.includes(point[1])
};

export function isAdjacentAngle(point, prevPoint, nextPoint, type) {
  const coord = type === 'vertical' ? 0 : 1;

  return ((prevPoint[coord] > point[coord]) &&
    (nextPoint[coord] > point[coord])) ||
    ((prevPoint[coord] < point[coord]) &&
      (nextPoint[coord] < point[coord]))
};

export function isInSquare(minX, maxX, minY, maxY, point) {
  return point[0] >= minX &&
    point[0] <= maxX &&
    point[1] >= minY &&
    point[1] <= maxY
}

export function isStrictlyInSquare(minX, maxX, minY, maxY, point) {
  return point[0] > minX &&
    point[0] < maxX &&
    point[1] > minY &&
    point[1] < maxY
}

//Gives the side of the square on which the split point is
//Do not handle corners !!!
export function splitSquareSide(minX, maxX, minY, maxY, splitPoint) {
  if (splitPoint[0] === minX) {
    return 'left'
  }
  if (splitPoint[0] === maxX) {
    return 'right'
  }
  if (splitPoint[1] === minY) {
    return 'bottom'
  }
  if (splitPoint[1] === maxY) {
    return 'top'
  }
}

//Handle corners with selection of the belonging side
export function splitSquareSide2(minX, maxX, minY, maxY, splitPoint) {
  if (splitPoint[0] === minX && splitPoint[1] < maxY) { return 'left' }
  if (splitPoint[0] === maxX && splitPoint[1] > minY) { return 'right' }
  if (splitPoint[1] === minY && splitPoint[0] > minX) { return 'bottom' }
  if (splitPoint[1] === maxY && splitPoint[0] < maxX) { return 'top' }
}

const SQUARE = ['top', 'right', 'bottom', 'left'];

export function isCornerPath(minX, maxX, minY, maxY, path) {
  const startPoint = path[0];
  const endPoint = path[path.length - 1];
  const startSide = splitSquareSide(minX, maxX, minY, maxY, startPoint);
  const endSide = splitSquareSide(minX, maxX, minY, maxY, endPoint);
  const gap = Math.abs(SQUARE.indexOf(endSide) - SQUARE.indexOf(startSide))
  if (gap === 1 || gap === 3) {
    return true;
  }
  return false;
}

//Gives if the point is at the corner of the square
export function isInCorner(minX, maxX, minY, maxY, point) {
  const validCoord = [minX, maxX, minY, maxY];
  return validCoord.includes(point[0]) && validCoord.includes(point[1])
}

export function followingCorner(minX, maxX, minY, maxY, point) {
  const side = splitSquareSide2(minX, maxX, minY, maxY, point);
  switch (side) {
    case 'left':
      return [minX, maxY];
    case 'right':
      return [maxX, minY];
    case 'bottom':
      return [minX, minY];
    case 'top':
      return [maxX, maxY];
  }
}

export function isVirtual(point, cornerPoints) {
  return includeArr(cornerPoints, point);
}

function adjacentPathReference(point, cloudPoint, commonCoord) {
  const path = [point];
  const originIdx = findPointIndex(cloudPoint, point);
  let maxIdx = originIdx;

  //Find path inline
  mapFrom(cloudPoint, originIdx, (pt, idx) => {
    if (idx - maxIdx === 1 && point[commonCoord] === pt[commonCoord]) {
      maxIdx = idx;
      path.push(pt)
    }
  })
  cloudPoint.reverse()
  let minIdx = findPointIndex(cloudPoint, point);
  mapFrom(cloudPoint, originIdx, (pt, idx) => {
    if (idx - minIdx === 1 && point[commonCoord] === cloudPoint[minIdx][commonCoord]) {
      minIdx = idx;
      path.splice(0, 0, pt);
    }
  })
  cloudPoint.reverse();

  //Add next and previous point
  const prevPoint = cloudPoint[minIdx === 0 ? cloudPoint.length - 1 : minIdx - 1]
  const nextPoint = cloudPoint[maxIdx === cloudPoint.length - 1 ? 0 : maxIdx + 1]
  path.splice(0, 0, prevPoint);
  path.push(nextPoint);
  return path
}

function isInAdjacentPath(point, prevPoint, nextPoint, pointCloud, commonCoord) {
  if (
    !(point[commonCoord] === prevPoint[commonCoord]) &&
    !(point[commonCoord] === nextPoint[commonCoord])
  ) {
    return false
  }
  const adjPathRef = adjacentPathReference(point, pointCloud, commonCoord);
  const progressCoord = commonCoord === 0 ? 1 : 0;
  return (
    (point[progressCoord] > adjPathRef[0][progressCoord] &&
      point[progressCoord] > adjPathRef[adjPathRef.length - 1][progressCoord]) ||
    (point[progressCoord] < adjPathRef[0][progressCoord] &&
      point[progressCoord] < adjPathRef[adjPathRef.length - 1][progressCoord])
  )
}

function isFirstPointInCrossingAdjacentPath(point, prevPoint, nextPoint, pointCloud, commonCoord) {
  if (
    !(point[commonCoord] === prevPoint[commonCoord]) &&
    !(point[commonCoord] === nextPoint[commonCoord])
  ) {
    return false
  }
  const adjPathRef = adjacentPathReference(point, pointCloud, commonCoord);
  const progressCoord = commonCoord === 0 ? 1 : 0;
  if (
    (point[progressCoord] > adjPathRef[0][progressCoord] &&
      point[progressCoord] < adjPathRef[adjPathRef.length - 1][progressCoord]) ||
    (point[progressCoord] < adjPathRef[0][progressCoord] &&
      point[progressCoord] > adjPathRef[adjPathRef.length - 1][progressCoord])
  ) {
    return findPointIndex(pointCloud, point) === 1;
  }
  return false;
}

export function isPointInMiddle(startPoint, endPoint, point, commonCoord, progressCoord) {
  return (((endPoint[progressCoord] < startPoint[progressCoord]) &&
    (point[progressCoord] < startPoint[progressCoord]) &&
    (point[progressCoord] > endPoint[progressCoord])) ||
    ((endPoint[progressCoord] > startPoint[progressCoord]) &&
      (point[progressCoord] > startPoint[progressCoord]) &&
      (point[progressCoord] < endPoint[progressCoord]))) &&
    (point[commonCoord] === startPoint[commonCoord])
}

export function crossPointNb(startPoint, endPoint, pointCloud) {
  const commonCoord = startPoint[0] === endPoint[0] ? 0 : 1;
  const progressCoord = startPoint[0] === endPoint[0] ? 1 : 0;
  return pointCloud.filter((point, idx) => {
    //Keep endPoint if involved in an adjacent path
    if (arePointsEqual(endPoint, point)) {
      const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
      const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]
      if (
        isPointInMiddle(startPoint, endPoint, prevPoint, commonCoord, progressCoord) ||
        isPointInMiddle(startPoint, endPoint, nextPoint, commonCoord, progressCoord)
      ) {
        return true;
      }
    }
    //Check is the point is in the middle
    return isPointInMiddle(startPoint, endPoint, point, commonCoord, progressCoord)
  }).filter(point => {
    //Check if the inline points or bounce points should be counted
    const idx = findPointIndex(pointCloud, point);
    const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
    const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]

    return (!isAdjacentAngle(point, prevPoint, nextPoint, commonCoord === 0 ? 'vertical' : 'horizontal') &&
      !isInAdjacentPath(point, prevPoint, nextPoint, pointCloud, commonCoord)) ||
      isFirstPointInCrossingAdjacentPath(point, prevPoint, nextPoint, pointCloud, commonCoord)
  }).length
}

export function isInnerCorner(minX, maxX, minY, maxY, point, polygonPoints) {
  const topRef = [point[0], max(polygonPoints, 1) + 1];
  const bottomRef = [point[0], min(polygonPoints, 1) - 1];
  const rightRef = [max(polygonPoints, 0) + 1, point[1]];
  const leftRef = [min(polygonPoints, 0) - 1, point[1]];

  if (arePointsEqual([minX, minY], point)) {
    return crossPointNb(topRef, point, polygonPoints) % 2 === 1 ||
      crossPointNb(rightRef, point, polygonPoints) % 2 === 1
  }
  if (arePointsEqual([minX, maxY], point)) {
    return crossPointNb(bottomRef, point, polygonPoints) % 2 === 1 ||
      crossPointNb(rightRef, point, polygonPoints) % 2 === 1
  }
  if (arePointsEqual([maxX, maxY], point)) {
    return crossPointNb(bottomRef, point, polygonPoints) % 2 === 1 ||
      crossPointNb(leftRef, point, polygonPoints) % 2 === 1
  }
  if (arePointsEqual([maxX, minY], point)) {
    return crossPointNb(topRef, point, polygonPoints) % 2 === 1 ||
      crossPointNb(leftRef, point, polygonPoints) % 2 === 1
  }
}

export function isBouncePoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint) {
  return isInSquare(minX, maxX, minY, maxY, point) &&
    !isInSquare(minX, maxX, minY, maxY, nextPoint) &&
    !isInSquare(minX, maxX, minY, maxY, prevPoint)
}

export function isEntryPoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint) {
  return isInSquare(minX, maxX, minY, maxY, point) &&
    isInSquare(minX, maxX, minY, maxY, nextPoint) &&
    !isInSquare(minX, maxX, minY, maxY, prevPoint)
}

export function isStrictEntryPoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint) {
  return isInSquare(minX, maxX, minY, maxY, point) &&
    (
      isStrictlyInSquare(minX, maxX, minY, maxY, nextPoint) || 
      (isOnSquareSide(minX, maxX, minY, maxY, nextPoint) &&
      splitSquareSide2(minX, maxX, minY, maxY, nextPoint) !== splitSquareSide2(minX, maxX, minY, maxY, point))
      ) &&
    !isStrictlyInSquare(minX, maxX, minY, maxY, prevPoint)
}

export function isExitPoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint) {
  return isInSquare(minX, maxX, minY, maxY, point) &&
    !isInSquare(minX, maxX, minY, maxY, nextPoint) &&
    isInSquare(minX, maxX, minY, maxY, prevPoint)
}

export function isStrictExitPoint(minX, maxX, minY, maxY, point, prevPoint, nextPoint) {
  return isInSquare(minX, maxX, minY, maxY, point) &&
    !isInSquare(minX, maxX, minY, maxY, nextPoint) &&
    isStrictlyInSquare(minX, maxX, minY, maxY, prevPoint)
}

//Get relative points

export function getUpPointsNb(testPoint, pointCloud) {
  return pointCloud.filter((point, idx) => {
    const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
    const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]

    return (point[0] === testPoint[0]) &&
      (point[1] > testPoint[1]) &&
      !isAdjacentAngle(point, prevPoint, nextPoint, 'vertical') &&
      !arePointsAligned(prevPoint, point, 'vertical')
  }).length
}

export function getDownPointsNb(testPoint, pointCloud) {
  return pointCloud.filter((point, idx) => {
    const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
    const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]

    return (point[0] === testPoint[0]) &&
      (point[1] < testPoint[1]) &&
      !isAdjacentAngle(point, prevPoint, nextPoint, 'vertical') &&
      !arePointsAligned(prevPoint, point, 'vertical')
  }).length
}

export function getLeftPointsNb(testPoint, pointCloud) {
  return pointCloud.filter((point, idx) => {
    const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
    const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]

    return (point[0] < testPoint[0]) &&
      (point[1] === testPoint[1]) &&
      !isAdjacentAngle(point, prevPoint, nextPoint, 'horizontal') &&
      !arePointsAligned(prevPoint, point, 'horizontal')
  }).length
}

export function getRightPointsNb(testPoint, pointCloud) {
  return pointCloud.filter((point, idx) => {
    const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
    const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]

    return (point[0] > testPoint[0]) &&
      (point[1] === testPoint[1]) &&
      !isAdjacentAngle(point, prevPoint, nextPoint, 'horizontal') &&
      !arePointsAligned(prevPoint, point, 'horizontal')
  }).length
}

//Gives on which grid line that split point belongs
export function splitPointType(point, gridSize) {
  if (point[0] % gridSize === 0 && point[1] % gridSize === 0) {
    return 'double'
  }
  if (point[0] % gridSize === 0 && !(point[1] % gridSize === 0)) {
    return 'vertical'
  }
  if (!(point[0] % gridSize === 0) && point[1] % gridSize === 0) {
    return 'horizontal'
  }
  if (!(point[0] % gridSize === 0) && !(point[1] % gridSize === 0)) {
    return 'none'
  }
}

//Gives if 2 two points are aligned in a given axis
export function arePointsAligned(pointA, pointB, type) {
  const coord = type === 'vertical' ? 0 : 1;
  return pointA[coord] === pointB[coord];
}

//If a polygon point is a split point and both closest neibhors are on the same side of the gridline

export function isCornerPointDirect(point, cornerPoint, pointCloud) {
  if (!arePointsAligned(point, cornerPoint, 'vertical') && !arePointsAligned(point, cornerPoint, 'horizontal')) {
    return false;
  }
  let unsharedCoord = point[0] === cornerPoint[0] ? 1 : 0;
  let sharedCoord = point[0] === cornerPoint[0] ? 0 : 1;
  const type = sharedCoord === 0 ? 'vertical' : 'horizontal';

  return pointCloud
    .filter(cloudPoint => cloudPoint[0] !== point[0] && cloudPoint[1] !== point[1])
    .filter((cloudPoint, idx) => {
      const prevPoint = pointCloud[idx === 0 ? pointCloud.length - 1 : idx - 1]
      const nextPoint = pointCloud[idx === pointCloud.length - 1 ? 0 : idx + 1]

      return cloudPoint[sharedCoord] === point[sharedCoord] &&
        ((cloudPoint[unsharedCoord] < cornerPoint[unsharedCoord] &&
          cloudPoint[unsharedCoord] > point[unsharedCoord]) ||
          (cloudPoint[unsharedCoord] > cornerPoint[unsharedCoord] &&
            cloudPoint[unsharedCoord] < point[unsharedCoord])) &&
        !arePointsAligned(cloudPoint, prevPoint, type) &&
        !arePointsAligned(cloudPoint, nextPoint, type) &&
        !isAdjacentAngle(cloudPoint, prevPoint, nextPoint, type)
    }).length === 0
}
