import { Test, TestingModule } from "@nestjs/testing";
import { SocketCodeEditorService } from "./socket-code-editor.service";

describe("SocketCodeEditorService", () => {
  let service: SocketCodeEditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketCodeEditorService],
    }).compile();

    service = module.get<SocketCodeEditorService>(SocketCodeEditorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
