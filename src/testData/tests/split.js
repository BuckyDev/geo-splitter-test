import input1 from '../samples/split/input1.json';
import input2 from '../samples/split/input2.json';
import input3 from '../samples/split/input3.json';
import input4 from '../samples/split/input4.json';
import input5 from '../samples/split/input5.json';
import input6 from '../samples/split/input6.json';
import input7 from '../samples/split/input7.json';

import expectedOutput1 from '../samples/split/expectedOutput1.json';
import expectedOutput2 from '../samples/split/expectedOutput2.json';
import expectedOutput3 from '../samples/split/expectedOutput3.json';
import expectedOutput4 from '../samples/split/expectedOutput4.json';
import expectedOutput5 from '../samples/split/expectedOutput5.json';
import expectedOutput6 from '../samples/split/expectedOutput6.json';
import expectedOutput7 from '../samples/split/expectedOutput7.json';

export const splitData = [
  {
    title: 'General case',
    input: {data: input1, gridSize: 6},
    expectedOutput: expectedOutput1,
  },
  {
    title: 'Points on limits',
    input: {data: input2, gridSize: 6},
    expectedOutput: expectedOutput2,
  },
  {
    title: 'Paths on limits',
    input: {data: input3, gridSize: 6},
    expectedOutput: expectedOutput3,
  },
  {
    title: 'Points on angles',
    input: {data: input4, gridSize: 6},
    expectedOutput: expectedOutput4,
  },
  {
    title: 'Paths crossing angles',
    input: {data: input5, gridSize: 6},
    expectedOutput: expectedOutput5,
  },
  {
    title: 'Paths crossing perp limits',
    input: {data: input6, gridSize: 6},
    expectedOutput: expectedOutput6,
  },
  {
    title: 'Paths crossing parallel limits',
    input: {data: input7, gridSize: 6},
    expectedOutput: expectedOutput7,
  },
]