import { describe, it, expect } from 'vitest';
// import submittedAnswer by user

export const codingChallengesList = [
  {
    id: 1,
    name: 'Sum Tests 2 + 2',
    description:
      'Write a function named sum that takes two numbers as arguments and returns their sum. The function should be able to handle both positive and negative integers, as well as floating-point numbers. Your implementation should focus on accuracy and efficiency, taking into account the different types of numeric inputs it might receive.',
    difficultyOfChallenge: 'easy',
    tests: [
      { name: 'a', input: [2, 2], expected: 4 },
      {
        name: 'b',
        input: [0, 0],
        expected: 0,
      },
    ],
  },
];
