import React, { Component } from 'react';

import * as d3 from 'd3';
import { generateGOGrid } from './Grid/generateGOGrid';

var split = require('geo-splitter').split

function genArray(start, stop, diff) {
  let arr = [];
  let value = start;
  while (value <= stop) {
    arr.push(value);
    value = value + diff;
  }
  return arr;
}

class GeoOrthographicGrid extends Component {
  constructor(props) {
    super(props);
    if (props.type === 'splitted') {
      const splitted = split(props.data, props.xMin, props.xMax, props.yMin, props.yMax, props.gridSize);
      this.state = {
        splitted,
      }
    }
  }

  static defaultProps = {
    gridLines: true,
    zoom: 1,
    renderPoints: true,
    renderExtraLinePoints: true,
  }

  renderGrid() {
    const { xMin, xMax, yMin, yMax, gridSize, zoom } = this.props;

    // Compute horizontal grid lines
    const hArr = genArray(yMin, yMax, 1);
    const horizontalLines = hArr.map((val) => (
      <path
        stroke='gray'
        stroke-width='1'
        d={`M${xMin * zoom * 10} ${10 * zoom * val} L${xMax * zoom * 10} ${10 * zoom * val} Z`}
      />
    ))

    // Compute vertical grid lines
    const vArr = genArray(xMin, xMax, 1);
    const verticalLines = vArr.map((val) => (
      <path
        stroke='gray'
        stroke-width='1'
        d={`M${10 * zoom * val} ${yMin * zoom * 10} L${10 * zoom * val} ${yMax * zoom * 10} Z`}
      />
    ))

    // Compute grid tiles
    const gridTilesArray = generateGOGrid({
      equatorialTileSize: gridSize,
      mapHeight: yMax - yMin,
      mapWidth: xMax - xMin
    })

    const gridTiles = gridTilesArray.map((gridTile) => (
      <path
        stroke='white'
        stroke-width='2'
        fill='none'
        d={`M${
          10 * zoom * gridTile[0][0]
        } ${
          10 * zoom * gridTile[0][1]
        } L${
          10 * zoom * gridTile[1][0]
        } ${
          10 * zoom * gridTile[1][1]
        } L${
          10 * zoom * gridTile[2][0]
        } ${
          10 * zoom * gridTile[2][1]
        } L${
          10 * zoom * gridTile[3][0]
        } ${
          10 * zoom * gridTile[3][1]
        } Z`}
      />
    ))

    return horizontalLines.concat(verticalLines).concat(gridTiles)
  }

  renderVerticalGridLines() {
    const { xMin, xMax, yMin, yMax, gridSize, gridLines, zoom } = this.props;
    if (gridLines) {
      const arr = genArray(xMin, xMax, 1);
      return arr.map((val) => (
        <path
          stroke={val % gridSize === 0 ? 'white' : 'gray'}
          stroke-width={val % gridSize === 0 ? '2' : '1'}
          d={`M${10 * zoom * val} ${yMin * zoom * 10} L${10 * zoom * val} ${yMax * zoom * 10} Z`}
        />
      ))
    } else {
      const arr = genArray(xMin, xMax, gridSize);
      return arr.map((val) => (
        <path
          stroke='white'
          stroke-width='2'
          d={`M${10 * zoom * val} ${yMin * zoom * 10} L${10 * zoom * val} ${yMax * zoom * 10} Z`}
        />
      ))
    }
  }

  render() {
    const { xMin, xMax, yMin, yMax, zoom } = this.props;
    return (
      <svg height={(yMax - yMin) * 10 * zoom} width={(xMax - xMin) * 10 * zoom}>
        {this.renderGrid()}
      </svg>
    );
  }
}

export default GeoOrthographicGrid;
