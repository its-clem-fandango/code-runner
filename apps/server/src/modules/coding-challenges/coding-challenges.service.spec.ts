import { Test, TestingModule } from "@nestjs/testing";
import { CodingChallengesService } from "./coding-challenges.service";

describe("CodingChallengesService", () => {
  let service: CodingChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodingChallengesService],
    }).compile();

    service = module.get<CodingChallengesService>(CodingChallengesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
