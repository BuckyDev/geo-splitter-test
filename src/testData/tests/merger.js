import input1 from '../samples/merger/input1.json';
import expectedOutput1 from '../samples/merger/expectedOutput1.json';

export const mergerData = [
  {
    title: 'Common case',
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
    expectedOutput: expectedOutput1,
  },
]