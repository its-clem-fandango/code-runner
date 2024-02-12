import { Injectable } from '@nestjs/common';
import { battles } from 'src/database/battles';

@Injectable()
export class BattleService {
  getBattles() {
    return battles;
  }
  getBattle(id: number) {
    const battle = battles.find((battle) => battle.id === id);
    return battle;
  }
  updateBattle(id: number) {
    const battle = battles.find((battle) => battle.id === id);
    if (battle.playerCount >= 2) {
      return { error: 'battle already full!' };
    } else {
      battle.playerCount++;
    }
    return battle;
  }
  createBattle(
    battleName: string,
    userName: string,
    difficulty: string,
    join: string,
  ) {
    const battle = {
      id: battles.length + 1,
      BattleName: battleName,
      Username: userName,
      Difficulty: difficulty,
      playerCount: 0,
      Join: join,
    };
    battles.push(battle);
    return battles;
  }
}
