import input8 from '../samples/input8.json';
import input9 from '../samples/input9.json';
import input10 from '../samples/input10.json';
import input11 from '../samples/input11.json';
import input12 from '../samples/input12.json';
import input13 from '../samples/input13.json';
import input14 from '../samples/input14.json';
import input15 from '../samples/input15.json';

import expectedOutput8 from '../samples/expectedOutput8.json';
import expectedOutput9 from '../samples/expectedOutput9.json';
import expectedOutput10 from '../samples/expectedOutput10.json';
import expectedOutput11 from '../samples/expectedOutput11.json';
import expectedOutput12 from '../samples/expectedOutput12.json';
import expectedOutput13 from '../samples/expectedOutput13.json';
import expectedOutput14 from '../samples/expectedOutput14.json';
import expectedOutput15 from '../samples/expectedOutput15.json';

export const cornerPointsData = [
  {
    title: 'General case',
    input: {data: input8, gridSize: 6},
    expectedOutput: {data: expectedOutput8},
  },
  {
    title: 'Paths crossing angles',
    input: {data: input9, gridSize: 6},
    expectedOutput: {data: expectedOutput9},
  },
  {
    title: 'Paths on limits',
    input: {data: input10, gridSize: 6},
    expectedOutput: {data: expectedOutput10},
  },
  {
    title: 'No crossing',
    input: {data: input11, gridSize: 6},
    expectedOutput: {data: expectedOutput11},
  },
  {
    title: 'PacMan edge case',
    input: {data: input12, gridSize: 6},
    expectedOutput: {data: expectedOutput12},
  },
  {
    title: 'Crossing adjacent path',
    input: {data: input13, gridSize: 6},
    expectedOutput: {data: expectedOutput13},
  },
  {
    title: 'Bouncing adjacent path',
    input: {data: input14, gridSize: 6},
    expectedOutput: {data: expectedOutput14},
  },
  {
    title: 'Bounce points',
    input: {data: input15, gridSize: 6},
    expectedOutput: {data: expectedOutput15},
  },
]