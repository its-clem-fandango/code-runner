export const codingChallengesList = [
  {
    challengeId: 1,
    name: "Simple Addition",
    description:
      "**Write a function named `sum`** that takes two numbers as arguments and returns their sum. The function should be able to handle both positive and negative integers, as well as floating-point numbers. Your implementation should focus on accuracy and efficiency, taking into account the different types of numeric inputs it might receive.",
    difficultyOfChallenge: "easy",
    example: `When given the inputs \`3\` and \`5\` it should return \`8\`

\`\`\`javascript
sum(3, 5) // returns 8
sum(13, -7) // returns 6
sum(0.1, 0.2) // returns 0.3
\`\`\`
    `,
    tests: [
      {
        name: "2+2",
        description: "Should return 4",
        input: [2, 2],
        expected: 4,
      },
      {
        name: "13 + (-7)",
        description: "Should return 6",
        input: [13, -7],
        expected: 6,
      },
    ],
  },
  {
    challengeId: 2,
    name: "Even or Odd",
    description:
      'Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.',
    difficultyOfChallenge: "easy",
    example: `When given the input \`3\` it should return \`"Odd"\`

\`\`\`javascript
evenOrOdd(2) // returns "Even"
evenOrOdd(7) // returns "Odd"
\`\`\`
    `,
    tests: [
      {
        name: "test1",
        description: "Should return odd",
        input: [3],
        expected: "Odd",
      },
      {
        name: "test2",
        description: "Should return even",
        input: [4],
        expected: "Even",
      },
    ],
  },
  {
    challengeId: 3,
    name: "Vowel Count",
    description:
      "Write a function called `countVowels` that returns the number (count) of vowels in the given string. We will consider a, e, i, o, u as vowels for this Kata (but not y). The input string will only consist of lower case letters and/or spaces.",
    difficultyOfChallenge: "medium",
    example: `When given the input \`"abracadabra"\` it should return \`5\`
\`\`\`javascript
countVowels("abracadabra") // returns 5
countVowels("hello world") // returns 3
\`\`\`
    `,
    tests: [
      {
        name: "test1",
        description: "Should return 5",
        input: ["abracadabra"],
        expected: 5,
      },
    ],
  },
  {
    challengeId: 4,
    name: "Twice as Old",
    description:
      "Your function takes two arguments,fathersAge -> current father's age (years) and daughtersAge -> current age of his daughter (years). Сalculate how many years ago the father was twice as old as his daughter (or in how many years he will be twice as old).",
    difficultyOfChallenge: "medium",
    example: `When given the inputs \`40\` and \`20\` it should return \`0\`

    \`\`\`javascript
    twiceAsOld(36, 7) // returns 22
    twiceAsOld(40, 24) // returns 8
    \`\`\`
        `,
    tests: [
      {
        name: "test1",
        description: "Should return 0",
        input: [40, 20],
        expected: 0,
      },
      {
        name: "test2",
        description: "Should return 8",
        input: [40, 24],
        expected: 8,
      },
    ],
  },
  {
    challengeId: 5,
    name: "Reverse Words",
    description:
      "Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.",
    difficultyOfChallenge: "medium",
    example: `When given the input \`"This is CodeRacer!"\` it should return \`"sihT si na !recaRedoC"\`

\`\`\`javascript
reverseWords("This is an example!") // returns "sihT si na !elpmaxe"
\`\`\`
    `,
    tests: [
      {
        name: "test1",
        description: "Should return 'sihT si na !elpmaxe'",
        input: ["This is an example!"],
        expected: "sihT si na !elpmaxe",
      },
      {
        name: "test2",
        description: "Should return 'elbuod  secaps'",
        input: ["double  spaces"],
        expected: "elbuod  secaps",
      },
    ],
  },
  {
    challengeId: 6,
    name: "Closest Elevator",
    description:
      'Given 2 elevators (named "left" and "right") in a building with 3 floors (numbered 0 to 2), write a function elevator accepting 3 arguments (in order): left - The current floor of the left elevator. right - The current floor of the right elevator.call - The floor that called an elevator.It should return the name of the elevator closest to the called floor ("left"/"right"). In the case where both elevators are equally distant from the called floor, choose the elevator to the right.You can assume that the inputs will always be valid integers between 0-2',
    difficultyOfChallenge: "medium",
    example: `When given the inputs \`0\`, \`1\` and \`0\` it should return \`"left"\`

    \`\`\`javascript
    elevator(0, 1, 0) // returns "left"
    elevator(0, 1, 2) // returns "right"
    \`\`\`
        `,
    tests: [
      {
        name: 'If the left elevator is closer to the call, should return "left"',
        description: "Should return left",
        input: [0, 1, 0],
        expected: "left",
      },
      {
        name: 'If the right elevator is closer to the call, should return "right"',
        description: "Should return right",
        input: [0, 1, 1],
        expected: "right",
      },
    ],
  },
  /* {
    challengeId: 7,
    name: "The suffixer",
    description:
      "Create a function suffixer that, given a string suffix, returns a function that prepends the suffix to a given str.",
    difficultyOfChallenge: "medium",
    tests: [
      { name: "test1", input: ["spot"], expected: "spotify" },
      { name: "test2", input: ["shop"], expected: "shopify" },
    ],
  }, */
  {
    challengeId: 8,
    name: "How Many Smaller Than Me?",
    description:
      "Write a function that given an array, returns an array of the same length where each number in the array is one number less than the number in the original array and is in the same index position.",
    difficultyOfChallenge: "hard",
    tests: [
      {
        name: "test1",
        description: "Should return [4, 3, 2, 1, 0]",
        input: [[5, 4, 3, 2, 1]],
        expected: [4, 3, 2, 1, 0],
      },
      {
        name: "test2",
        description: "Should return [1, 1, 0]",
        input: [[1, 2, 0]],
        expected: [1, 1, 0],
      },
    ],
  },
  {
    challengeId: 10,
    name: "Fibonacci",
    description:
      "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. Write a function that takes an integer called 'element' and returns the element-th number of the Fibonacci sequence where: fibonacci(0) is 0, fibonacci(1) is 1 and so on",
    difficultyOfChallenge: "medium",
    example: `When given the input \`15\` it should return \`610\`

    \`\`\`javascript
    fibonacci(5) // returns 5
    fibonacci(2) // returns 1
    \`\`\`
        `,
    tests: [
      {
        name: "test1",
        description: "Should return 0",
        input: [0],
        expected: 0,
      },
      {
        name: "test2",
        description: "Should return 55",
        input: [10],
        expected: 55,
      },
    ],
  },
  {
    challengeId: 11,
    name: "Return Negative Numbers",
    description:
      "Write a function that takes a number as an argument and returns it as a negative number. Negative numbers should be left as is.",
    difficultyOfChallenge: "easy",
    example: `When given the input \`4\` it should return \`-4\`

    \`\`\`javascript
    negative(5) // returns -5
    negative(-3) // returns -3
    \`\`\`
        `,
    tests: [
      {
        name: "test1",
        description: "Should return -77",
        input: [-77],
        expected: -77,
      },
      {
        name: "test2",
        description: "Should return -20",
        input: [20],
        expected: -20,
      },
    ],
  },
  {
    challengeId: 12,
    name: "Sum of Positive Numbers",
    description:
      "Return the sum of all positive numbers in an array. If there are no positive numbers, return 0.",
    difficultyOfChallenge: "easy",
    example: `When given the input \`[1, -4, 7, 12]\` it should return \`20\`

    \`\`\`javascript
    positiveSum([3, -1, 7, 12]) // returns 22
    positiveSum([-3, -1, -7, -12]) // returns 0
    \`\`\`
        `,
    tests: [
      {
        name: "test1",
        description: "Should return 5",
        input: [1, -5, 7, 2],
        expected: 5,
      },
      {
        name: "test2",
        description: "Should return 0",
        input: [-1, -5, -7, -2],
        expected: 0,
      },
    ],
  },
  {
    challengeId: 13,
    name: "Convert Boolean Values to Strings 'Yes' or 'No'",
    description:
      "Write a function that takes a boolean value and returns a 'Yes' for true, or a 'No' for false.",
    difficultyOfChallenge: "easy",
    example: `When given the boolean \`true\` it should return \`"Yes"\`

    \`\`\`javascript
    booleanString(true) // returns "Yes"
    booleanString(false) // returns "No"
    \`\`\`
        `,
    tests: [
      {
        name: "test1",
        description: "Should return 'Yes'",
        input: [true],
        expected: "Yes",
      },
      {
        name: "test2",
        description: "Should return 'No'",
        input: [false],
        expected: "No",
      },
    ],
  },
  {
    challengeId: 14,
    name: "Convert Number to String",
    description:
      "Write a function that takes a number and returns it as a string.",
    difficultyOfChallenge: "easy",
    example: `When given the number \`123\` it should return \`"123"\`

    \`\`\`javascript
    numToString(444) // returns "444"
    numToString(27) // returns "27"
    \`\`\`
        `,
    tests: [
      {
        name: "test1",
        description: "Should return 'Yes'",
        input: [123],
        expected: "123",
      },
      {
        name: "test2",
        description: "Should return 'No'",
        input: [-100],
        expected: "-100",
      },
    ],
  },
  {
    challengeId: 15,
    name: "Return Opposite Number",
    description: "Given a number, return the opposite of that number.",
    difficultyOfChallenge: "easy",
    example: `When given the number \`5\` it should return \`-5\`

    \`\`\`javascript
    oppositeNumber(444) // returns -444
    oppositeNumber(-1) // returns 1
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return -12",
        input: [12],
        expected: -12,
      },
      {
        name: "Test2",
        description: "Should return 42",
        input: [-42],
        expected: 42,
      },
    ],
  },
  {
    challengeId: 16,
    name: "Remove First and Last Character",
    description:
      "Write a function that removes the first and last characters of a string.",
    difficultyOfChallenge: "easy",
    example: `When given the string \`"beans"\` it should return \`"ean"\`

    \`\`\`javascript
    removeChar("umbrella") // returns "mbrell"
    removeChar("CodeRacer") // returns "odeRace"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 'ell'",
        input: ["hello"],
        expected: "ell",
      },
      {
        name: "Test2",
        description: "Should return 'rogramme'",
        input: ["programmer"],
        expected: "rogramme",
      },
    ],
  },
  {
    challengeId: 17,
    name: "Square and Sum",
    description:
      "Write a function that squares each number in an array and then sums the results.",
    difficultyOfChallenge: "easy",
    example: `When given the array \`[1, 2, 3]\` it should return \`14\` because \`1^2 + 2^2 + 3^2 = 14\`

    \`\`\`javascript
    squareSum([2, 3, 4]) // returns 29
    squareSum([1, 5, 7]) // returns 75
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 14",
        input: [[1, 2, 3]],
        expected: 14,
      },
      {
        name: "Test2",
        description: "Should return 69",
        input: [[5, 6, 2, 2]],
        expected: 69,
      },
    ],
  },
  {
    challengeId: 18,
    name: "String Repeat",
    description: "Write a function that repeats the given string `n` times.",
    difficultyOfChallenge: "easy",
    example: `When given the string \`"cheese"\` and the number \`3\` it should return \`"cheesecheesecheese"\`

    \`\`\`javascript
    repeatStr(5, "hello") // returns "hellohellohellohellohello"
    repeatStr(3, "world") // returns "worldworldworld"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 'codecodecode",
        input: [3, "code"],
        expected: "codecodecode",
      },
      {
        name: "Test2",
        description: "Should return 'racerracerracerracer'",
        input: [4, "racer"],
        expected: "racerracerracerracer",
      },
    ],
  },
  {
    challengeId: 19,
    name: "Sum of Digits",
    description:
      "Write a function that calculates and returns the total of all numbers from 1 to num, where num is a positive integer greater than 0.",
    difficultyOfChallenge: "easy",
    example: `When given the number \`5\` it should return \`15\` because \`1 + 2 + 3 + 4 + 5 = 15\`

    \`\`\`javascript
    sumsNums(10) // returns 55
    sumsNums(3) // returns 6
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 10",
        input: [4],
        expected: 10,
      },
      {
        name: "Test2",
        description: "Should return 45",
        input: [9],
        expected: 45,
      },
    ],
  },
  {
    challengeId: 20,
    name: "Remove String Spaces",
    description: "Write a function that removes the spaces from a string.",
    difficultyOfChallenge: "easy",
    example: `When given the string \`"hey now you're an allstar get your game on go play"\` it should return \`"heynowyou'reanallstargetyourgameongoplay"\`

    \`\`\`javascript
    removeSpaces("oijaosdf 1230k asdf 1") // returns "oijaosdf1230kasdf1"
    removeSpaces("R3ady s3t Go!") // returns "R3adys3tGo!"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return laisdhjf12as8dfaof9jsaISDF",
        input: ["laisdhjf 12 as8df aof9 jsa   ISDF"],
        expected: "laisdhjf12as8dfaof9jsaISDF",
      },
      {
        name: "Test2",
        description: "Should return 45",
        input: ["Someb0dy 1nc3 t0ld m3 th3 w0rld 1s g0nn4 r0ll m3"],
        expected: "Someb0dy1nc3t0ldm3th3w0rld1sg0nn4r0llm3",
      },
    ],
  },
  {
    challengeId: 21,
    name: "Find Smallest Integer in Array",
    description:
      "Write a function that returns the smallest integer in an array.",
    difficultyOfChallenge: "easy",
    example: `When given the array \`[34, 15, 88, 2]\` it should return \`2\`

    \`\`\`javascript
    findSmallestInt([78, 56, 232, 12]) // returns 12
    findSmallestInt([0, 1, 2, 3, 4, 5]) // returns 0
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return laisdhjf12as8dfaof9jsaISDF",
        input: [[51, 21, 2, 3, 4, 5]],
        expected: 2,
      },
      {
        name: "Test2",
        description: "Should return 45",
        input: [[901, 312, 11, 500]],
        expected: 11,
      },
    ],
  },
  {
    challengeId: 22,
    name: "Abbreviate Name",
    description:
      "Write a function that takes a full name and returns an abbreviated version.",
    difficultyOfChallenge: "easy",
    example: `When given the name \`"Sam Harris"\` it should return \`"S.H"\`

    \`\`\`javascript
    abbreviate("fredd somm") // returns "F.S"
    abbreviate("Manel Gaspar") // returns "M.G"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 'A.V'",
        input: ["Arol Vinolas"],
        expected: "A.V",
      },
      {
        name: "Test2",
        description: "Should return 'R.G'",
        input: ["Ruben guedes"],
        expected: "R.G",
      },
    ],
  },
  {
    challengeId: 23,
    name: "Convert Numbers to Reversed Array of Digits",
    description:
      "Write a function that takes a number and returns an array of its digits in reverse order.",
    difficultyOfChallenge: "easy",
    example: `When given the number \`12345\` it should return \`[5, 4, 3, 2, 1]\`

    \`\`\`javascript
    reverseNum(348597) // returns [7, 9, 5, 8, 4, 3]
    reverseNum(123456789) // returns [9, 8, 7, 6, 5, 4, 3, 2, 1]
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return [1, 2, 3, 4, 5]",
        input: [54321],
        expected: [1, 2, 3, 4, 5],
      },
      {
        name: "Test2",
        description: "Should return [2, 0, 4, 6, 9]",
        input: [96402],
        expected: [2, 0, 4, 6, 9],
      },
      {
        name: "Test3",
        description: "Should return [0]",
        input: [0],
        expected: [0],
      },
    ],
  },
  {
    challengeId: 24,
    name: "Do You Love Me?",
    description:
      "Create a function that simulates two people picking petals from daisies to find out if they are in love. If one daisy has an even number of petals and the other an odd number, they are in love. The function should return true if they are in love, otherwise false",
    difficultyOfChallenge: "easy",
    example: `When given inputs \`2\` and \`3\` it should return \`true\`

    \`\`\`javascript
    love(4, 3) // returns true
    love(4, 2) // returns false
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return true for an even and an odd combination",
        input: [2, 3],
        expected: true,
      },
      {
        name: "Test2",
        description: "Should return false for two even numbers",
        input: [4, 2],
        expected: false,
      },
      {
        name: "Test3",
        description: "Should return false for two odd numbers",
        input: [1, 5],
        expected: false,
      },
    ],
  },
  {
    challengeId: 25,
    name: "Dynamic Welcome",
    description:
      "Write a function that takes a name and returns a greeting. Make sure to use the exact sentence: 'Welcome to Costco, `<insert name>`. I love you!'",
    difficultyOfChallenge: "easy",
    example: `Welcome to Costco, \`name\`. I love you!

    \`\`\`javascript
    welcome("Natalie") // returns "Welcome to Costco, Natalie. I love you!"
    welcome("Olga") // returns "Welcome to Costco, Olga. I love you!"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 'Welcome to Costco, Jean. I love you!'",
        input: ["Jean"],
        expected: "Welcome to Costco, Jean. I love you!",
      },
      {
        name: "Test2",
        description: "Should return 'Welcome to Costco, Luca. I love you!'",
        input: ["Luca"],
        expected: "Welcome to Costco, Luca. I love you!",
      },
    ],
  },
  {
    challengeId: 26,
    name: "Palindrome Checker",
    description:
      "Write a function that takes a string and returns true if the string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.",
    difficultyOfChallenge: "easy",
    example: `When given the string \`"racecar"\` it should return \`true\`

    \`\`\`javascript
    isPalindrome("racecar") // returns true
    isPalindrome("coderacer") // returns false
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return true for a palindrome",
        input: ["radar"],
        expected: true,
      },
      {
        name: "Test2",
        description: "Should return false",
        input: ["CodeRacer"],
        expected: false,
      },
    ],
  },
  {
    challengeId: 27,
    name: "Remove Vowels",
    description: "Write a function that removes all vowels from a string.",
    difficultyOfChallenge: "medium",
    example: `The input \`"You suck at CodeRacer!"\` should return \`"Y sck t CdRcr!"\`

    \`\`\`javascript
    removeVowels("You're not punk and I'm telling everyone") // returns "Y'r nt pnk nd 'm tllng vryn"
    removeVowels("I love coding!") // returns " lv cdng!"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return true for a palindrome",
        input: ["You're not punk and I'm telling everyone"],
        expected: "Y'r nt pnk nd 'm tllng vryn",
      },
      {
        name: "Test2",
        description: "Should return false",
        input: ["Save your breath I never was one"],
        expected: "Sv yr brth  nvr ws n",
      },
    ],
  },
  {
    challengeId: 28,
    name: "Square Every Digit",
    description:
      "Write a function that squares each digit of a number and concatenates them.",
    difficultyOfChallenge: "medium",
    example: `The input \`9119\` should return \`811181\`

    \`\`\`javascript
    squareDigits(3212) // returns 9414
    squareDigits(1337) // returns 19949
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 19949",
        input: [1337],
        expected: 19949,
      },
      {
        name: "Test2",
        description: "Should return 811181",
        input: [9119],
        expected: 811181,
      },
    ],
  },
  {
    challengeId: 29,
    name: "Total Between",
    description:
      "Write a function that finds the total of every whole number from one given number to another, including both numbers themselves. These numbers can be any whole numbers, big or small. If the two numbers are the same, the function should just return that number.",
    difficultyOfChallenge: "medium",
    example: `The input \`1\` and \`0\` should return \`1\` because 1 plus 0 equals 1

    \`\`\`javascript
    totalBetween(1, 2) // returns 3 because 1 + 2 = 3
    totalBetween(-1, 2) // returns 2 because -1 + 0 + 1 + 2 = 2
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return -1",
        input: [-1, 0],
        expected: -1,
      },
      {
        name: "Test2",
        description: "Should return 1",
        input: [1, 1],
        expected: 1,
      },
      {
        name: "Test3",
        description: "Should return 3",
        input: [1, 2],
        expected: 3,
      },
    ],
  },
  {
    challengeId: 30,
    name: "DNA Complement",
    description:
      "Create a function that takes a string representing one side of a DNA strand and returns a string representing the other side. In DNA, each letter stands for a chemical that pairs with another specific chemical: 'A' pairs with 'T', 'C' pairs with 'G', and vice versa.",
    difficultyOfChallenge: "medium",
    example: `When given the string \`"ATTGC"\` it should return \`"TAACG"\`

    \`\`\`javascript
    dnaComplement("GTAT") // returns "CATA"
    dnaComplement("ACGT") // returns "TGCA"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return GTAT",
        input: ["CATA"],
        expected: "GTAT",
      },
      {
        name: "Test2",
        description: "Should return TGCA",
        input: ["TGCA"],
        expected: "ACGT",
      },
    ],
  },
  {
    challengeId: 31,
    name: "List Filtering",
    description:
      "Create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.",
    difficultyOfChallenge: "medium",
    example: `When given the array \`[1, 'a', 'b', 0, 15]\` it should return \`[1, 0, 15]\`

    \`\`\`javascript
    filterList([1, 2, 'a', 'b']) // returns [1, 2]
    filterList([4, 'a', 0, 15]) // returns [4, 0, 15]
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return [1, 2, 0, 15]",
        input: [[1, 2, "aasd", "1", 0, 15]],
        expected: [1, 2, 0, 15],
      },
      {
        name: "Test2",
        description: "Should return TGCA",
        input: [["3", 4, 123, "a", 0, 15]],
        expected: [4, 123, 0, 15],
      },
    ],
  },
  {
    challengeId: 32,
    name: "Is the Number Square?",
    description:
      "Write a function to check if a given whole number is a square number. A square number is an integer that can be made by multiplying an integer by itself. For example, 4 is a square number because 2 x 2 equals 4.",
    difficultyOfChallenge: "medium",
    example: `When given the number \`25\` it should return \`true\`

    \`\`\`javascript
    isSquare(-1) // returns false
    isSquare(4) // returns true
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return false because negative numbers are not square",
        input: [-1],
        expected: false,
      },
      {
        name: "Test2",
        description: "Should return true because 0 = 0*0",
        input: [0],
        expected: true,
      },
      {
        name: "Test3",
        description: "Should return true because 25 = 5*5",
        input: [25],
        expected: true,
      },
    ],
  },
  {
    challengeId: 33,
    name: "Highest and Lowest",
    description:
      "Given a string of space separated numbers, return the highest and lowest number.",
    difficultyOfChallenge: "medium",
    example: `When given the numbers \`"1 9 3 4 -5"\` it should return \`"9 -5"\`

    \`\`\`javascript
    highAndLow("1 2 3 4 -5") // returns "4 -5"
    highAndLow("91 0 -1 3 4") // returns "91 -1"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return false because negative numbers are not square",
        input: ["8 3 -5 -1 0 0 7 42 4 -4 5"],
        expected: "42 -5",
      },
      {
        name: "Test2",
        description: "Should return true because 0 = 0*0",
        input: ["1 2 3"],
        expected: "3 1",
      },
    ],
  },
  {
    challengeId: 34,
    name: "Categorize Members",
    description:
      "Write a function that categorizes potential members into 'Senior' or 'Open' based on their age and handicap. If a person is 55 years old or older and has a handicap greater than 7, they should be categorized as 'Senior'. Otherwise, they will be categorized as 'Open'.",
    difficultyOfChallenge: "medium",
    example: `When given the array \`[[18, 20], [45, 2], [61, 12], [37, 6]]\` it should return \`["Open", "Open", "Senior", "Open"]\`

    \`\`\`javascript
    catMembers([[18, 20], [45, 2], [61, 12], [37, 6]]) // returns ["Open", "Open", "Senior", "Open"]
    catMembers([[55, 8], [60, 12], [61, 6], [37, 6]]) // returns ["Senior", "Senior", "Open", "Open"]
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return ['Open', 'Senior', 'Open', 'Senior']",
        input: [
          [
            [45, 12],
            [55, 21],
            [19, -2],
            [104, 20],
          ],
        ],
        expected: ["Open", "Senior", "Open", "Senior"],
      },
      {
        name: "Test2",
        description:
          "Should return ['Open', 'Open', 'Open', 'Open'] because all members are younger than 55",
        input: [
          [
            [3, 12],
            [55, 1],
            [91, -2],
            [53, 23],
          ],
        ],
        expected: ["Open", "Open", "Open", "Open"],
      },
      {
        name: "Test3",
        description:
          "Should return ['Senior', 'Open', 'Open', 'Open'] because the first member is older than 55 and has a handicap greater than 7",
        input: [
          [
            [59, 12],
            [55, -1],
            [12, -2],
            [12, 12],
          ],
        ],
        expected: ["Senior", "Open", "Open", "Open"],
      },
    ],
  },
  {
    challengeId: 35,
    name: "Sum of Two Lowest Positive Integers",
    description:
      "Write a function that finds and sums the two smallest numbers in an array of at least four positive integers. All entries in the array will be positive integers.",
    difficultyOfChallenge: "medium",
    example: `When given the array \`[19, 5, 42, 2, 77]\` it should return \`7\` because 2 + 5 = 7

    \`\`\`javascript
    sumTwoSmallest([5, 8, 12, 19, 22]) // returns 13
    sumTwoSmallest([15, 28, 4, 2, 43]) // returns 6
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return 13 because 5 + 8 = 13 and 5 and 8 are the two smallest numbers",
        input: [[5, 8, 12, 19, 22]],
        expected: 13,
      },
      {
        name: "Test2",
        description: "Should return 24 because 23 + 1 = 24",
        input: [[23, 71, 33, 82, 1]],
        expected: 24,
      },
    ],
  },
  {
    challengeId: 36,
    name: "Capitalize Every Word",
    description:
      "Write a function that capitalizes the first letter of every word in a string.",
    difficultyOfChallenge: "medium",
    example: `When given the string \`"hey! ho! let's go!"\` it should return \`"Hey! Ho! Let's Go!"\`

    \`\`\`javascript
    captalizeWords("succulent chinese meal") // returns "Succulent Chinese Meal"

    captalizeWords("the quick brown fox") // returns "The Quick Brown Fox"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return 'I Was Driving Doing Nothing On The Shores Of Great Salt Lake",
        input: ["i was driving doing nothing on the shores of great salt lake"],
        expected:
          "I Was Driving Doing Nothing On The Shores Of Great Salt Lake",
      },
      {
        name: "Test2",
        description: "Should return 'I've Got A Cupboard With Cans Of Food'",
        input: ["i've got a cupboard with cans of food"],
        expected: "I've Got A Cupboard With Cans Of Food",
      },
    ],
  },
  {
    challengeId: 37,
    name: "Find the Middle Character",
    description:
      "Write a function that returns the middle character of a word. If the word's length is even, return the middle two characters.",
    difficultyOfChallenge: "medium",
    example: `When given the word \`"coderacer"\` it should return \`"er"\`

    \`\`\`javascript
    middleChar("testing") // returns "t"
    middleChar("middle") // returns "dd"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return 'r' because 'jerry' has an odd number of characters",
        input: ["jerry"],
        expected: "r",
      },
      {
        name: "Test2",
        description:
          "Should return 'in' because 'seinfeld' has an even number of characters",
        input: ["seinfeld"],
        expected: "nf",
      },
    ],
  },
  {
    challengeId: 38,
    name: "Accumulated Strings",
    description:
      "Write a function that transforms a given string into a new string where each character is repeated a number of times equal to its position in the original string (counting from 1). The first letter of each repeated group is capitalized and the rest are lowercase. Each group should be separated by a hyphen ('-').",
    difficultyOfChallenge: "medium",
    example: `When given the string \`"abcd"\` it should return \`"A-Bb-Ccc-Dddd"\`

    \`\`\`javascript
    accumulator("RqaEzt") // returns "R-Qq-Aaa-Eeee-Zzzzz-Tttttt"
    accumulator("cwAt") // returns "C-Ww-Aaa-Tttt"
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description: "Should return 'O-Aa-Sss-Kkkk-Ooooo-Aaaaaa-Ppppppp",
        input: ["OasKoaP"],
        expected: "O-Aa-Sss-Kkkk-Ooooo-Aaaaaa-Ppppppp",
      },
      {
        name: "Test2",
        description: "Should return 'P-Oo-Mmm-Vvvv-Aaaaa-Zzzzzz'",
        input: ["PoMvAZ"],
        expected: "P-Oo-Mmm-Vvvv-Aaaaa-Zzzzzz",
      },
    ],
  },
  {
    challengeId: 39,
    name: "Isograms",
    description:
      "Write a function that determines if a word is an isogram. An isogram is a word that has no repeating letters. Assume an empty string is an isogram and ignore letter case.",
    difficultyOfChallenge: "medium",
    example: `When given the string \`"Dermatoglyphics"\` it should return \`true\`

    \`\`\`javascript
    checkIso("isogram") // returns true
    checkIso("aba") // returns false
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return false because 'moOse' has repeating letters",
        input: ["moOse"],
        expected: false,
      },
      {
        name: "Test2",
        description: "Should return true",
        input: [""],
        expected: true,
      },
      {
        name: "Test3",
        description:
          "Should return true because 'Dermatoglyphics' has no repeating letters",
        input: ["Dermatoglyphics"],
        expected: true,
      },
    ],
  },
  {
    challengeId: 40,
    name: "Find Second Occurence",
    description:
      "Write a function that searches for the second occurrence of a specified letter within a given string. The function should return the index position of this second occurrence. If the letter does not appear twice, the function should return -1.",
    difficultyOfChallenge: "medium",
    example: `When given the string \`Hello world\` and the letter \`l\` it should return \`3\`

    \`\`\`javascript
    findSecond("Werewolves of London", "o") // returns 11
    findSecond("Meet Me After Midnight", "M") // returns 5
    \`\`\`
        `,
    tests: [
      {
        name: "Test1",
        description:
          "Should return false because 'moOse' has repeating letters",
        input: ["CodeRacing Addict", "d"],
        expected: 12,
      },
      {
        name: "Test2",
        description: "Should return true",
        input: ["", "o"],
        expected: -1,
      },
      {
        name: "Test3",
        description:
          "Should return true because 'Dermatoglyphics' has no repeating letters",
        input: ["Hello!", "?"],
        expected: -1,
      },
    ],
  },
];
