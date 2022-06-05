import React from 'react';
import TestSection from './TestSection';

import { splitData } from '../testData/tests/split';
import { cornerPointsData } from '../testData/tests/cornerPoints';
import { cornerMergerData } from '../testData/tests/cornerMerger';
import { noCornerMergerData } from '../testData/tests/noCornerMerger';
import { subsetData } from '../testData/tests/subset';

import {
  addSplitPoints,
  cornerPointMerger,
  generateCornerPoints,
  generatePointSubset,
} from 'geo-splitter';

function OrthonormalTests() {
  return (
    <>
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
        outputType='lineArray'
        inputType='map'
        sectionTitle='Pre-split path into square areas subset'
        subTitle='generatePointSubset(minX, maxX, minY, maxY, coordinates)'
        testFunction={stuff => generatePointSubset(stuff.minX, stuff.maxX, stuff.minY, stuff.maxY, stuff.coordinates)}
        testData={subsetData}
      />
      <TestSection
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
        testData={cornerMergerData}
      />
      <TestSection
        outputType='map'
        inputType='merger'
        sectionTitle='Merge paths without corner points'
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
        testData={noCornerMergerData}
      />
    </>
  );
}

export default OrthonormalTests;
