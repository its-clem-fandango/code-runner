import { codingChallengesList } from 'src/database/codingChallenges';

export const testRunner = (codingChallengesList, submited) =>
  codingChallengesList.tests.forEach((t) => {
    test(t.name, () => {
      expect(submited(...t.input)).toBe(t.expected);
    });
  });

// describe('sum function', () => {
//     it('correctly sums an array of numbers', () => {
//       const input = [1, 2, 3, 4];
//       const expectedOutput = 10;
//       const result = sum(input);
//       expect(result).toBe(expectedOutput);
//     });
//   });
