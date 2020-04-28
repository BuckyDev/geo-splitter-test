import input1 from '../samples/cornerMerger/input1.json';
import input3 from '../samples/cornerMerger/input3.json';
import input4 from '../samples/cornerMerger/input4.json';
import input5 from '../samples/cornerMerger/input5.json';
import input6 from '../samples/cornerMerger/input6.json';
import input7 from '../samples/cornerMerger/input7.json';
import input8 from '../samples/cornerMerger/input8.json';
import input9 from '../samples/cornerMerger/input9.json';
import input10 from '../samples/cornerMerger/input10.json';

import expectedOutput1 from '../samples/cornerMerger/expectedOutput1.json';
import expectedOutput2 from '../samples/cornerMerger/expectedOutput2.json';
import expectedOutput3 from '../samples/cornerMerger/expectedOutput3.json';
import expectedOutput4 from '../samples/cornerMerger/expectedOutput4.json';
import expectedOutput5 from '../samples/cornerMerger/expectedOutput5.json';
import expectedOutput6 from '../samples/cornerMerger/expectedOutput6.json';
import expectedOutput7 from '../samples/cornerMerger/expectedOutput7.json';
import expectedOutput8 from '../samples/cornerMerger/expectedOutput8.json';
import expectedOutput9 from '../samples/cornerMerger/expectedOutput9.json';
import expectedOutput10 from '../samples/cornerMerger/expectedOutput10.json';

export const cornerMergerData = [
  {
    title: 'Single corner',
    input: {
      data: {
        data: input1,
        lines: [[[12,10],[14,10],[14,7],[13.5,6]]],
        points: [[12,6]],
      },
      minX: 12,
      maxX: 18,
      minY: 6,
      maxY: 12,
      pointSubset: [[[12,10],[14,10],[14,7],[13.5,6]]],
      cornerPointSubset: [[12,6]],
      featurePoints: input1.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput1,
  },
  {
    title: 'Double corners',
    input: {
      data: {
        data: input1,
        lines: [[[6,9],[8,10],[12,10]]],
        points: [[6,6],[12,6]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,9],[8,10],[12,10]]],
      cornerPointSubset: [[6,6],[12,6]],
      featurePoints: input1.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput2,
  },
  {
    title: 'Triple corners',
    input: {
      data: {
        data: input3,
        lines: [[[6,9],[8,10],[9,12]]],
        points: [[6,6],[12,6],[12,12]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,9],[8,10],[9,12]]],
      cornerPointSubset: [[6,6],[12,6],[12,12]],
      featurePoints: input3.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput3,
  },
  {
    title: 'Quadruple corners',
    input: {
      data: {
        data: input4,
        lines: [[[7,12],[8,10],[9,12]]],
        points: [[6,6],[6,12],[12,12],[12,6]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[7,12],[8,10],[9,12]]],
      cornerPointSubset: [[6,6],[6,12],[12,12],[12,6]],
      featurePoints: input4.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput4,
  },
  {
    title: 'No paths and quad corners',
    input: {
      data: {
        data: input5,
        lines: [],
        points: [[6,6],[6,12],[12,12],[12,6]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [],
      cornerPointSubset: [[6,6],[6,12],[12,12],[12,6]],
      featurePoints: input5.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput5,
  },
  {
    title: 'Double independent corners',
    input: {
      data: {
        data: input6,
        lines: [[[6,9],[8,6]],[[10,6],[12,10]]],
        points: [[6,6],[12,6]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,9],[8,6]],[[10,6],[12,10]]],
      cornerPointSubset: [[6,6],[12,6]],
      featurePoints: input6.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput6,
  },
  {
    title: 'Triple independent corners',
    input: {
      data: {
        data: input7,
        lines: [[[6,9],[8,6]],[[10,6],[12,8]],[[12,10],[10,12]]],
        points: [[6,6],[12,6],[12,12]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,9],[8,6]],[[10,6],[12,8]],[[12,10],[10,12]]],
      cornerPointSubset: [[6,6],[12,6],[12,12]],
      featurePoints: input7.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput7,
  },
  {
    title: 'Quadruple independent corners',
    input: {
      data: {
        data: input8,
        lines: [[[6,8],[8,6]],[[10,6],[12,8]],[[12,10],[10,12]],[[6,10],[7,12]]],
        points: [[6,6],[6,12],[12,12],[12,6]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,8],[8,6]],[[10,6],[12,8]],[[12,10],[10,12]],[[6,10],[7,12]]],
      cornerPointSubset: [[6,6],[6,12],[12,12],[12,6]],
      featurePoints: input8.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput8,
  },
  {
    title: 'Opposite double corners',
    input: {
      data: {
        data: input9,
        lines: [[[6,9],[8,10],[9,12]],[[12,10],[10,6]]],
        points: [[6,6],[12,12]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,9],[8,10],[9,12]],[[12,10],[10,6]]],
      cornerPointSubset: [[6,6],[12,12]],
      featurePoints: input9.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput9,
  },
  {
    title: 'Multiple following paths',
    input: {
      data: {
        data: input10,
        lines: [[[6,9],[8,10],[9,12]],[[11,12],[12,10]],[[10,6],[12,8]]],
        points: [[6,6]],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,9],[8,10],[9,12]],[[11,12],[12,10]],[[10,6],[12,8]]],
      cornerPointSubset: [[6,6]],
      featurePoints: input10.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput10,
  },
]
