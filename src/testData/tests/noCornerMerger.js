import input1 from '../samples/noCornerMerger/input1.json';
import input2 from '../samples/noCornerMerger/input2.json';
import input3 from '../samples/noCornerMerger/input3.json';
import input4 from '../samples/noCornerMerger/input4.json';
import input5 from '../samples/noCornerMerger/input5.json';
import input6 from '../samples/noCornerMerger/input6.json';
import input7 from '../samples/noCornerMerger/input7.json';
import input8 from '../samples/noCornerMerger/input8.json';
import input9 from '../samples/noCornerMerger/input9.json';
import input10 from '../samples/noCornerMerger/input10.json';

import expectedOutput1 from '../samples/noCornerMerger/expectedOutput1.json';
import expectedOutput2 from '../samples/noCornerMerger/expectedOutput2.json';
import expectedOutput3 from '../samples/noCornerMerger/expectedOutput3.json';
import expectedOutput4 from '../samples/noCornerMerger/expectedOutput4.json';
import expectedOutput5 from '../samples/noCornerMerger/expectedOutput5.json';
import expectedOutput6 from '../samples/noCornerMerger/expectedOutput6.json';
import expectedOutput7 from '../samples/noCornerMerger/expectedOutput7.json';
import expectedOutput8 from '../samples/noCornerMerger/expectedOutput8.json';
import expectedOutput9 from '../samples/noCornerMerger/expectedOutput9.json';
import expectedOutput10 from '../samples/noCornerMerger/expectedOutput10.json';

export const noCornerMergerData = [
  {
    title: 'Single path',
    input: {
      data: {
        data: input1,
        lines: [[[8,10],[10,11],[11,10],[9,7]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[8,10],[10,11],[11,10],[9,7]]],
      cornerPointSubset: [],
      featurePoints: input1.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput1,
  },
  {
    title: 'Single edge path',
    input: {
      data: {
        data: input2,
        lines: [[[8,10],[10,11],[11,10],[12,8],[12,6],[10,6]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[8,10],[10,11],[11,10],[12,8],[12,6],[10,6]]],
      cornerPointSubset: [],
      featurePoints: input2.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput2,
  },
  {
    title: "Edge path and islands (shouldn't happen)",
    input: {
      data: {
        data: input3,
        lines: [[[8,10],[10,11],[11,10],[12,8],[12,6],[10,6]],[[7,6],[8,9],[9,6]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[8,10],[10,11],[11,10],[12,8],[12,6],[10,6]],[[7,6],[8,9],[9,6]]],
      cornerPointSubset: [],
      featurePoints: input3.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput3,
  },
  {
    title: 'Multiple self-closed paths',
    input: {
      data: {
        data: input4,
        lines: [[[10,6],[8,10],[10,11],[11,10],[11,6]],[[7,6],[8,9],[9,6]],[[7,12],[8,11],[9,12]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[10,6],[8,10],[10,11],[11,10],[11,6]],[[7,6],[8,9],[9,6]],[[7,12],[8,11],[9,12]]],
      cornerPointSubset: [],
      featurePoints: input4.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput4,
  },
  {
    title: 'Multiple paths turned in single polygon',
    input: {
      data: {
        data: input5,
        lines: [[[11,12],[12,10]],[[12,8],[10,6]],[[8,6],[6,8]],[[6,9],[8,10],[9,12]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[11,12],[12,10]],[[12,8],[10,6]],[[8,6],[6,8]],[[6,9],[8,10],[9,12]]],
      cornerPointSubset: [],
      featurePoints: input5.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput5,
  },
  {
    title: 'Multiple non self-closed paths turned in multiple polygon',
    input: {
      data: {
        data: input6,
        lines: [[[6,11],[7,12]],[[8,12],[6,10]],[[6,9],[8,10],[9,12]],[[6,8],[7,8],[11,12]],[[12,10],[9,7],[7,6]],[[10,6],[12,8]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,11],[7,12]],[[8,12],[6,10]],[[6,9],[8,10],[9,12]],[[6,8],[7,8],[11,12]],[[12,10],[9,7],[7,6]],[[10,6],[12,8]]],
      cornerPointSubset: [],
      featurePoints: input6.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput6,
  },
  {
    title: 'Corner path points edge case 1',
    input: {
      data: {
        data: input7,
        lines: [[[6,6],[8,9],[8,6]],[[9,6],[9,8],[11,6]],[[12,6],[10,8],[12,8]],[[12,10],[10,12],[12,12]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,6],[8,9],[8,6]],[[9,6],[9,8],[11,6]],[[12,6],[10,8],[12,8]],[[12,10],[10,12],[12,12]]],
      cornerPointSubset: [],
      featurePoints: input7.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput7,
  },
  {
    title: 'Corner path points edge case 2',
    input: {
      data: {
        data: input8,
        lines: [[[6,6],[8,9],[12,12]],[[8,12],[7,10],[6,12]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,6],[8,9],[12,12]],[[8,12],[7,10],[6,12]]],
      cornerPointSubset: [],
      featurePoints: input8.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput8,
  },
  {
    title: 'Corner path points butterfly edge case',
    input: {
      data: {
        data: input9,
        lines: [[[6,12],[8,9],[6,6]],[[12,6],[10,9],[12,12]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,12],[8,9],[6,6]],[[12,6],[10,9],[12,12]]],
      cornerPointSubset: [],
      featurePoints: input9.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput9,
  },
  {
    title: 'Corner path points corner butterfly edge case',
    input: {
      data: {
        data: input10,
        lines: [[[6,10],[8,9],[6,6],[9,8],[11,6]]],
        points: [],
      },
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      pointSubset: [[[6,10],[8,9],[6,6],[9,8],[11,6]]],
      cornerPointSubset: [],
      featurePoints: input10.features[0].geometry.coordinates
    },
    expectedOutput: expectedOutput10,
  },
]
