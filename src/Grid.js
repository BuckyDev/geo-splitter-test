import React, { Component } from 'react';

import * as d3 from 'd3';

import fullSample from './polygon/fullSample';
import split from './split';
import {
  genArray,
  randomColor
} from './utils';

class Grid extends Component {
  constructor(){
    super();
    this.state = {
      splitted: split(fullSample, 0, 100, 0, 50, 10)
    }
  }

  renderHorizontalGridLines() {
    const arr = genArray(0, 50, 1)
    return arr.map((val) => (
      <path
        stroke={val % 10 === 0 ? 'white' : 'gray'}
        stroke-width={val % 10 === 0 ? '2' : '1'}
        d={`M0 ${10 * val} L1000 ${10 * val} Z`}
      />
    ))
  }

  renderVerticalGridLines() {
    const arr = genArray(0, 100, 1)
    return arr.map((val) => (
      <path
        stroke={val % 10 === 0 ? 'white' : 'gray'}
        stroke-width={val % 10 === 0 ? '2' : '1'}
        d={`M${10 * val} 0 L${10 * val} 500 Z`}
      />
    ))
  }

  renderFullSamplePolygons() {
    return fullSample.features.map(feature => {
      return feature.geometry.coordinates.map(polygon => {
        const path = d3.line()(polygon.map(coord => [coord[0] * 10, 500 - coord[1] * 10]))
        return <path d={path} stroke="none" fill="#e2980c" />
      })
    })
  }

  renderFullSamplePoints() {
    return fullSample.features.map(feature => {
      return feature.geometry.coordinates.map(polygon => polygon
        .map(coord => <circle cx={coord[0] * 10} cy={500 - coord[1] * 10} r="4" stroke="none" fill="white" />)
      )
    })
  }

  renderSplittedPolygons() {
    return this.state.splitted.map(file => {
      const color = randomColor();
      return file.features.map(feature => {
        return feature.geometry.coordinates.map(polygon => {
          const path = d3.line()(polygon.map(coord => [coord[0] * 10, 500 - coord[1] * 10]))
          return <path d={path} stroke="none" fill={color} />
        })
      })
    })
  }

  renderSplittedPoints() {
    return this.state.splitted.map(file => {
      return file.features.map(feature => {
        return feature.geometry.coordinates.map(polygon => polygon
          .map(coord => <circle cx={coord[0] * 10} cy={500 - coord[1] * 10} r="4" stroke="none" fill="white" />)
        )
      })
    })
  }

  renderPolygons() {
    switch (this.props.type) {
      case 'original':
        return this.renderFullSamplePolygons();
      case 'splitted':
        return this.renderSplittedPolygons();
      case 'built-back':
      default:
        return null;
    }
  }

  renderPoints() {
    switch (this.props.type) {
      case 'original':
        return this.renderFullSamplePoints();
      case 'splitted':
        return this.renderSplittedPoints();
      case 'built-back':
      default:
        return null;
    }
  }

  render() {
    return (
      <svg height='500' width='1000'>
        {this.renderPolygons()}
        {this.renderHorizontalGridLines()}
        {this.renderVerticalGridLines()}
        {this.renderPoints()}
      </svg>
    );
  }
}

export default Grid;
