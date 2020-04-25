import React, { Component } from 'react';
import TestSection from './TestSection';

import { splitData } from '../testData/tests/split';
import { cornerPointsData } from '../testData/tests/cornerPoints';

import {
  addSplitPoints,
  generateCornerPoints,
} from 'geo-splitter';

class UnitTests extends Component {
  render() {
    return (
      <div>
        <TestSection
          outputType='map'
          sectionTitle='Generate split points'
          subTitle='addSplitPointsAll(data, gridSize)'
          testFunction={stuff => {
            return {
              ...stuff.data,
              features: addSplitPoints(stuff.data, stuff.gridSize)
            }
          }}
          testData={splitData}
        />
        <TestSection
          outputType='array'
          sectionTitle='Generate corner points'
          subTitle='generateCornerPoints(data, xStart, xEnd, yStart, yEnd, gridSize)'
          testFunction={stuff => generateCornerPoints(stuff.data, stuff.xStart, stuff.xEnd, stuff.yStart, stuff.yEnd, stuff.gridSize)}
          testData={cornerPointsData}
        />
      </div>
    );
  }
}

export default UnitTests;
