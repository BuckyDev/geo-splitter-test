export function randomColor() {
  return `rgb(${Math.floor(Math.random() * 205)+50},${Math.floor(Math.random() * 205)+50},${Math.floor(Math.random() * 205)+50})`
}

export function max(pointArray, coord) {
  let max;
  pointArray.map(pt => {
    if (!max) {
      max = pt[coord]
    } else if (pt[coord] > max) {
      max = pt[coord];
    }
  })
  return max;
}

export function min(pointArray, coord) {
  let min;
  pointArray.map(pt => {
    if (!min) {
      min = pt[coord]
    } else if (pt[coord] < min) {
      min = pt[coord];
    }
  })
  return min;
}

export function flattenDoubleArray(arr) {
  const result = [];
  arr.map(innerArr => innerArr.map(el => result.push(el)))
  return result;
}

export function substractArr(resultArr, removedArr) {
  removedArr.map(val => {
    const idx = resultArr.indexOf(val)
    if (idx > -1) {
      resultArr.splice(idx, 1);
    }
  })
}

export function findPointIndex(pointArr, point) {
  let index = -1
  pointArr.map((el, idx) => {
    if (index === -1 && arePointsEqual(el, point)) {
      index = idx;
    }
  })
  return index;
}

export function substractPoints(resultPointArr, removedPointArr) {
  removedPointArr.map(val => {
    const idx = findPointIndex(resultPointArr, val)
    if (idx > -1) {
      resultPointArr.splice(idx, 1);
    }
  })
}

export function mapFrom(arr, start, callback) {
  const length = arr.length;
  return arr.map((val, idx) => {
    const newIdx = idx + start < length ? idx + start : idx + start - length
    return callback(arr[newIdx], newIdx)
  })
}

export function genArray(start, stop, diff) {
  let arr = [];
  let value = start;
  while (value <= stop) {
    arr.push(value);
    value = value + diff;
  }
  return arr;
}

export function pushArray(arr1, arr2) {
  arr2.map(el => arr1.push(el))
}

function roundedTo(x, n) {
  return Math.floor(x / n) * n
}

function eqArr(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  return arr1.every((el, idx) => el === arr2[idx]);
}

export function arePointsEqual(p1, p2) {
  return eqArr(p1, p2);
}

export function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

export function includeArr(arr, val) {
  return !!arr.find(el => eqArr(el, val));
}

export function getSplitPoints(segment, gridSize) {
  const x1 = segment[0][0];
  const y1 = segment[0][1];
  const x2 = segment[1][0];
  const y2 = segment[1][1];
  const r = (y2 - y1) / (x2 - x1);

  const points = [];

  //Cross a vertical line
  if (roundedTo(Math.max(x1, x2), gridSize) !== roundedTo(Math.min(x1, x2), gridSize)) {
    const xline = roundedTo(Math.max(x1, x2), gridSize)
    const newPoint = [xline, (xline - x1) * r + y1]
    if (!includeArr(segment, newPoint)) {
      points.push(newPoint)
    }
  }

  //Cross a horizontal line
  if (roundedTo(Math.max(y1, y2), gridSize) !== roundedTo(Math.min(y1, y2), gridSize)) {
    const yline = roundedTo(Math.max(y1, y2), gridSize)
    const newPoint = [(yline - y1) / r + x1, yline]
    if (
      !includeArr(segment, newPoint) &&
      !eqArr(points[0] || [], newPoint)
    ) {
      points.push(newPoint)
    }
  }

  //Revert order if more natural
  if (points.length > 1 && distance([x1, y1], points[0]) > distance([x1, y1], points[1])) {
    points.reverse();
  }

  return points;
}

export const blobtest = [
  [5, 10],
  [7, 5],
  [10, 4.5],
  [13, 4],
  [15.571428571428571, 10],
  [16, 11],
  [17, 18],
  [20, 22.5],
  [18.333333333333332, 20],
  [21, 24],
  [20, 25.333333333333332],
  [18, 28],
  [20, 28.285714285714285],
  [25, 29],
  [25.4, 30],
  [27, 34],
  [25, 39],
  [23.666666666666668, 40],
  [21, 42],
  [20, 42.6],
  [16, 45],
  [12, 42],
  [10, 41],
  [8, 40],
  [6, 39],
  [5, 32],
  [7, 30],
  [9, 25],
  [8, 20],
  [10, 14]
]

export const blobtest2 = [
  [82, 9],
  [80, 8],
  [79.42857142857143, 10],
  [78, 15],
  [78, 19],
  [78.66666666666667, 20],
  [80, 22],
  [85, 24],
  [88, 23],
  [90, 21.8],
  [93, 20],
  [96, 20],
  [94, 15],
  [92, 12],
  [91.33333333333333, 10],
  [91, 9],
  [90, 9],
  [88, 9],
  [87.25, 10],
  [85, 13],
  [82.75, 10],
]
