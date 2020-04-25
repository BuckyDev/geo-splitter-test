import React, { Component } from 'react';
import TestSection from './TestSection';

import { splitData } from '../testData/tests/split';
import { cornerPointsData } from '../testData/tests/cornerPoints';

class UnitTests extends Component {
  render() {
    return (
      <div>
        <TestSection
          sectionTitle='Generate split points'
          subTitle='addSplitPointsAll(data, gridSize)'
          testFunction={stuff => stuff}
          testData={splitData}
        >
        </TestSection>
        <TestSection
          isInitiallyOpened={true}
          sectionTitle='Generate corner points'
          subTitle='generateCornerPoints(data, xStart, xEnd, yStart, yEnd, gridSize)'
          testFunction={stuff => stuff}
          testData={cornerPointsData}
        >
        </TestSection>
      </div>
    );
  }
}

export default UnitTests;
