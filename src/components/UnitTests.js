import React, { Component } from 'react';
import TestSection from './TestSection';

import { splitData } from '../testData/tests/split';
import { cornerPointsData } from '../testData/tests/cornerPoints';
import { mergerData } from '../testData/tests/merger';

import {
  addSplitPoints,
  cornerPointMerger,
  generateCornerPoints,
  generateCornerPointsSubset,
  generatePointSubset,
} from 'geo-splitter';

function UnitTests() {
  return (
    <div>
      <div>Main functions</div>
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
        outputType='pointArray'
        sectionTitle='Generate corner points'
        subTitle='generateCornerPoints(data, xStart, xEnd, yStart, yEnd, gridSize)'
        testFunction={stuff => generateCornerPoints(stuff.data, stuff.xStart, stuff.xEnd, stuff.yStart, stuff.yEnd, stuff.gridSize)}
        testData={cornerPointsData}
      />
      <TestSection
        isInitiallyOpened={true}
        outputType='map'
        inputType='merger'
        sectionTitle='Merge paths with corner points'
        subTitle='cornerPointMerger(minX, maxX, minY, maxY, pointSubset, cornerPointSubset, featurePoints)'
        testFunction={stuff => {
          const result = {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "id": "0"
                },
                "geometry": {
                  "type": "Polygon",
                  "coordinates": cornerPointMerger(stuff.minX, stuff.maxX, stuff.minY, stuff.maxY, stuff.pointSubset, stuff.cornerPointSubset, stuff.featurePoints)
                }
              }
            ]
          }
          return result
        }}
        testData={mergerData}
      />
    </div>
  );
}

export default UnitTests;
