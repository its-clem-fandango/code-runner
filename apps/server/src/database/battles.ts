/* import { codingChallengesList } from "./codingChallenges";
 */
export interface Battle {
  id: number;
  battleName: string;
  players: string[] | null;
  difficulty: string;
  playerCount: number;
  join: string;
  challengeId: number;
}

// UNCOMMENT TO SEE ALL CHALLENGES IN FE
/* export const battles = codingChallengesList.map((challenge, index) => {
  return {
    id: index,
    battleName: challenge.name,
    players: ["player"],
    difficulty: challenge.difficultyOfChallenge,
    playerCount: 0,
    join: "linkToJoinBattle",
    challengeId: challenge.challengeId,
  };
}); */

export const battles: Battle[] = [
  /* {
    id: 0,
    battleName: "Test1",
    players: ["Edu"],
    difficulty: "easy",
    playerCount: 0,
    join: "fightme@example.com",
    challengeId: 1,
  },
  {
    id: 1,
    battleName: "Test2",
    players: ["Gaspar-Noe"],
    difficulty: "medium",
    playerCount: 0,
    join: "fightme@example.com",
    challengeId: 3,
  },
  {
    id: 2,
    battleName: "Test3",
    players: ["DreadFredd"],
    difficulty: "hard",
    playerCount: 0,
    join: "fightme@example.com",
    challengeId: 8,
  },
  {
    id: 3, // Replace "someUniqueId" with a unique identifier for this object
    battleName: "Return Negative Numbers", // The 'name' from the challenge, used as the battle name
    players: ["player"], // Array containing the default player names, adjust as needed
    difficulty: "easy", // The 'difficultyOfChallenge' from the challenge details
    playerCount: 0, // You can set this to the number of players you expect
    join: "linkToJoinBattle", // Replace "linkToJoinBattle" with an actual link or identifier for joining
    challengeId: 11, // The 'challengeId' from the challenge details
  }, */
];
