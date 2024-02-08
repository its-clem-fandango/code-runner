import { Injectable } from '@nestjs/common';
import { battles } from 'src/database/battles';

@Injectable()
export class BattleService {
  getBattles() {
    return battles;
  }
  createBattle(
    battleName: string,
    userName: string,
    difficulty: string,
    join: string,
  ) {
    const battle = {
      BattleName: battleName,
      Username: userName,
      Difficulty: difficulty,
      Join: join,
    };
    battles.push(battle);
    return battles;
  }
}
