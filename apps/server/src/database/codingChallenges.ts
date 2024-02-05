export const codingChallengesList = [
  {
    challengeId: 1,
    name: 'Sum Tests 2 + 2',
    description:
      'Write a function named sum that takes two numbers as arguments and returns their sum. The function should be able to handle both positive and negative integers, as well as floating-point numbers. Your implementation should focus on accuracy and efficiency, taking into account the different types of numeric inputs it might receive.',
    difficultyOfChallenge: 'easy',
    tests: [
      { name: 'test1', input: [2, 2], expected: 4 },
      { name: 'test2', input: [13, -7], expected: 6 },
    ],
  },
  {
    challengeId: 2,
    name: 'Even or Odd',
    description:
      'Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.',
    difficultyOfChallenge: 'easy',
    tests: [
      { name: 'test1', input: [3], expected: 'Odd' },
      { name: 'test2', input: [4], expected: 'Even' },
    ],
  },
  {
    challengeId: 3, // Add a unique challengeId for the second challenge
    name: 'Vowel Count',
    description:
      'Return the number (count) of vowels in the given string. We will consider a, e, i, o, u as vowels for this Kata (but not y). The input string will only consist of lower case letters and/or spaces.',
    difficultyOfChallenge: 'medium',
    tests: [{ name: 'test1', input: ['abracadabra'], expected: 5 }],
  },
];
