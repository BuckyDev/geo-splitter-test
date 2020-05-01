import input1 from '../samples/subset/input1.json';
import input2 from '../samples/subset/input2.json';
import input2_1 from '../samples/subset/input2_1.json';
import input3 from '../samples/subset/input3.json';
import input4 from '../samples/subset/input4.json';
import input5 from '../samples/subset/input5.json';
import input6 from '../samples/subset/input6.json';
import input7 from '../samples/subset/input7.json';
import input8 from '../samples/subset/input8.json';

export const subsetData = [
  {
    title: 'General case',
    input: {
      data: input1,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input1.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,9],[8,10],[12,10]]],
  },
  {
    title: 'Adjacent path',
    input: {
      data: input2,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input2.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,9],[8,10],[12,10]]],
  },
  {
    title: 'Adjacent path 2',
    input: {
      data: input2_1,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input2_1.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,9],[8,10],[12,10]],[[12,7],[11,6],[7,6],[6,7]]],
  },
  {
    title: 'Adjacent path 3',
    input: {
      data: input2,
      minX: 6,
      maxX: 12,
      minY: 0,
      maxY: 6,
      coordinates: input2.features[0].geometry.coordinates,
    },
    expectedOutput: [[[12,4.5],[11,6],[7,6],[6,4.5]]],
  },
  {
    title: 'Bouncing adjacent corner path',
    input: {
      data: input3,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input3.features[0].geometry.coordinates,
    },
    expectedOutput: [[]],
  },
  {
    title: 'Crossing adjacent path',
    input: {
      data: input4,
      minX: 6,
      maxX: 12,
      minY: 0,
      maxY: 6,
      coordinates: input4.features[0].geometry.coordinates,
    },
    expectedOutput: [[[12,4.5],[11,6]]],
  },
  {
    title: 'Crossing adjacent path 2',
    input: {
      data: input4,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input4.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,9],[8,10],[12,10]],[[6,7],[7,6]]],
  },
  {
    title: 'Bouncing point',
    input: {
      data: input5,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input5.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,9],[8,12],[12,10]]],
  },
  {
    title: 'Bouncing corner path point',
    input: {
      data: input6,
      minX: 12,
      maxX: 18,
      minY: 0,
      maxY: 6,
      coordinates: input6.features[0].geometry.coordinates,
    },
    expectedOutput: [],
  },
  {
    title: 'Bouncing corner path point 2',
    input: {
      data: input6,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input6.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,9],[8,10],[12,10]],[[12,6]]],
  },
  {
    title: 'Adjacent path corner exclusive',
    input: {
      data: input7,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input7.features[0].geometry.coordinates,
    },
    expectedOutput: [],
  },
  {
    title: 'Adjacent path corner exclusive 2',
    input: {
      data: input7,
      minX: 6,
      maxX: 12,
      minY: 0,
      maxY: 6,
      coordinates: input7.features[0].geometry.coordinates,
    },
    expectedOutput: [[[6,6],[12,6]],[[12,4.5],[11,4],[7,4],[6,4.5]]],
  },
  {
    title: 'Adjacent path corner exclusive larger',
    input: {
      data: input8,
      minX: 6,
      maxX: 12,
      minY: 6,
      maxY: 12,
      coordinates: input8.features[0].geometry.coordinates,
    },
    expectedOutput: [],
  },
]