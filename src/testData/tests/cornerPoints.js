import input8 from '../samples/input8.json';
import input9 from '../samples/input9.json';
import input10 from '../samples/input10.json';
import input11 from '../samples/input11.json';
import input12 from '../samples/input12.json';
import input13 from '../samples/input13.json';
import input14 from '../samples/input14.json';
import input15 from '../samples/input15.json';

export const cornerPointsData = [
  {
    title: 'General case',
    input: {data: input8, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6],[12,6]]],
  },
  {
    title: 'Paths crossing angles',
    input: {data: input9, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6]]],
  },
  {
    title: 'Paths on limits',
    input: {data: input10, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6]]],
  },
  {
    title: 'No crossing',
    input: {data: input11, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[]],
  },
  {
    title: 'PacMan edge case',
    input: {data: input12, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6]]],
  },
  {
    title: 'Crossing adjacent path',
    input: {data: input13, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[12,6]]],
  },
  {
    title: 'Bouncing adjacent path',
    input: {data: input14, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6],[12,6]]],
  },
  {
    title: 'Bounce points',
    input: {data: input15, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6],[12,6]]],
  },
]