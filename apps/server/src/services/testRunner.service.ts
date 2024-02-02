export const testRunner = (codingChallengesList, submited) =>
  codingChallengesList.tests.forEach((t) => {
    test(t.name, () => {
      expect(submited(...t.input)).toBe(t.expected);
    });
  });
