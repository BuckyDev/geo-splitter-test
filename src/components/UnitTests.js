import React, { Component } from 'react';
import TestSection from './TestSection';

import fullSample from '../fullSample';

class UnitTests extends Component {
  render() {
    return (
      <div>
        <TestSection
          sectionTitle='Generate split points'
          subTitle='function ran'
          testFunction={stuff => stuff}
          testData={[
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
          ]}
        >
        </TestSection>
        <TestSection
          sectionTitle='Section'
          subTitle='function ran'
          testFunction={stuff => stuff}
          testData={[
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
          ]}
        >
        </TestSection>
        <TestSection
          sectionTitle='Section'
          subTitle='function ran'
          testFunction={stuff => stuff}
          testData={[
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
          ]}
        >
        </TestSection>
        <TestSection
          sectionTitle='Section'
          subTitle='function ran'
          testFunction={stuff => stuff}
          testData={[
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
          ]}
        >
        </TestSection>
        <TestSection
          sectionTitle='Section'
          subTitle='function ran'
          testFunction={stuff => stuff}
          testData={[
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
            {
              input: {data: fullSample},
              expectedOutput: {data: fullSample},
            },
          ]}
        >
        </TestSection>
      </div>
    );
  }
}

export default UnitTests;
