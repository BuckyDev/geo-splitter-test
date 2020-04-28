import input1 from '../samples/corner/input1.json';
import input2 from '../samples/corner/input2.json';
import input3 from '../samples/corner/input3.json';
import input4 from '../samples/corner/input4.json';
import input5 from '../samples/corner/input5.json';
import input6 from '../samples/corner/input6.json';
import input7 from '../samples/corner/input7.json';
import input8 from '../samples/corner/input8.json';

export const cornerPointsData = [
  {
    title: 'General case',
    input: {data: input1, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6],[12,6]]],
  },
  {
    title: 'Paths crossing angles',
    input: {data: input2, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6]]],
  },
  {
    title: 'Paths on limits',
    input: {data: input3, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6]]],
  },
  {
    title: 'No crossing',
    input: {data: input4, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[]],
  },
  {
    title: 'PacMan edge case',
    input: {data: input5, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6]]],
  },
  {
    title: 'Crossing adjacent path',
    input: {data: input6, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[12,6]]],
  },
  {
    title: 'Bouncing adjacent path',
    input: {data: input7, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6],[12,6]]],
  },
  {
    title: 'Bounce points',
    input: {data: input8, xStart: 0, xEnd: 18, yStart: 0, yEnd: 18, gridSize: 6},
    expectedOutput: [[[6,6],[12,6]]],
  },
]