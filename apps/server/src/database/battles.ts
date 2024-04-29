export interface Battle {
  id: number;
  battleName: string;
  players: string[] | null;
  difficulty: string;
  playerCount: number;
  join: string;
  challengeId: number;
}

export const battles: Battle[] = [
  {
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
];
