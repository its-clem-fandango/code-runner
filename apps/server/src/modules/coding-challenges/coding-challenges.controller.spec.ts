import { Test, TestingModule } from '@nestjs/testing';
import { CodingChallengesController } from './coding-challenges.controller';

describe('CodingChallengesController', () => {
  let controller: CodingChallengesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodingChallengesController],
    }).compile();

    controller = module.get<CodingChallengesController>(CodingChallengesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
