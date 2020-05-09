import React, { Component } from 'react';

import * as d3 from 'd3';

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

function randomColor() {
  return `rgb(${Math.floor(Math.random() * 205) + 50},${Math.floor(Math.random() * 205) + 50},${Math.floor(Math.random() * 205) + 50})`
}

class Grid extends Component {
  constructor(props) {
    super(props);
    if (props.type === 'splitted') {
      const splitted = split(props.data, props.xMin, props.xMax, props.yMin, props.yMax, props.gridSize);
      console.log(splitted)
      this.state = {
        splitted, 
      }
    }
  }

  renderHorizontalGridLines() {
    const { yMin, yMax, gridSize } = this.props;
    const arr = genArray(yMin, yMax, 1)
    return arr.map((val) => (
      <path
        stroke={val % gridSize === 0 ? 'white' : 'gray'}
        stroke-width={val % gridSize === 0 ? '2' : '1'}
        d={`M0 ${10 * val} L1000 ${10 * val} Z`}
      />
    ))
  }

  renderVerticalGridLines() {
    const { xMin, xMax, gridSize } = this.props;
    const arr = genArray(xMin, xMax, 1)
    return arr.map((val) => (
      <path
        stroke={val % gridSize === 0 ? 'white' : 'gray'}
        stroke-width={val % gridSize === 0 ? '2' : '1'}
        d={`M${10 * val} 0 L${10 * val} 500 Z`}
      />
    ))
  }

  renderFullSamplePolygons() {
    return this.props.data.features.map(feature => {
      return feature.geometry.coordinates.map(polygon => {
        const path = d3.line()(polygon.map(coord => [coord[0] * 10, (this.props.yMax - coord[1]) * 10]))
        return <path d={path} stroke="none" fill="#e2980c" />
      })
    })
  }

  renderFullSamplePoints() {
    return this.props.data.features.map(feature => {
      return feature.geometry.coordinates.map(polygon => polygon
        .map(coord => <circle cx={coord[0] * 10} cy={(this.props.yMax - coord[1]) * 10} r="4" stroke="none" fill="white" />)
      )
    })
  }

  renderSplittedPolygons() {
    return this.state.splitted.map(file => {
      const color = randomColor();
      return file.features.map(feature => {
        return feature.geometry.coordinates.map(polygon => {
          const path = d3.line()(polygon.map(coord => [coord[0] * 10, (this.props.yMax - coord[1]) * 10]))
          return <path d={path} stroke="none" fill={color} />
        })
      })
    })
  }

  renderSplittedPoints() {
    return this.state.splitted.map(file => {
      return file.features.map(feature => {
        return feature.geometry.coordinates.map(polygon => polygon
          .map(coord => <circle cx={coord[0] * 10} cy={(this.props.yMax - coord[1]) * 10} r="4" stroke="none" fill="white" />)
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

  renderZone(){
    const origin = this.props.highlight
    const {gridSize} = this.props;
    if(!origin){
      return null;
    } else {
      const line = [[origin.minX,origin.minY],[origin.minX,origin.minY + gridSize],[origin.minX + gridSize,origin.minY + gridSize],[origin.minX + gridSize,origin.minY],[origin.minX,origin.minY]]
      const path = d3.line()(line.map(coord => [coord[0] * 10, (this.props.yMax - coord[1]) * 10]))
      return <path d={path} stroke="rgb(31, 185, 108)" strokeWidth="2" fill="none" />
    }
  }

  renderExtraPoints() {
    if (!this.props.extraPoints) {
      return null;
    } else {
      return this.props.extraPoints.map(coord => <circle cx={coord[0] * 10} cy={(this.props.yMax - coord[1]) * 10} r="6" stroke="white" fill="rgb(226, 152, 12)" />)
    }
  }

  renderExtraLines() {
    if (!this.props.extraLines) {
      return null;
    } else {
      return this.props.extraLines.map(line => {
        const path = d3.line()(line.map(coord => [coord[0] * 10, (this.props.yMax - coord[1]) * 10]))
        return <path d={path} stroke="red" fill="none" />
      })
    }
  }

  renderExtraLinesPoints() {
    if (!this.props.extraLines) {
      return null;
    } else {
      return this.props.extraLines.map(line => 
        line.map(coord => <circle cx={coord[0] * 10} cy={(this.props.yMax - coord[1]) * 10} r="4" stroke="none" fill="white" />)
      )
    }
  }

  render() {
    const { xMin, xMax, yMin, yMax, data, extraLines } = this.props;
    return (
      <svg height={(yMax - yMin) * 10} width={(xMax - xMin) * 10}>
        {data && this.renderPolygons()}
        {this.renderHorizontalGridLines()}
        {this.renderVerticalGridLines()}
        {this.renderZone()}
        {data && !extraLines && this.renderPoints()}
        {this.renderExtraLines()}
        {this.renderExtraLinesPoints()}
        {this.renderExtraPoints()}
      </svg>
    );
  }
}

export default Grid;
