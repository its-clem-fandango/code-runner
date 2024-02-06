import { Test, TestingModule } from '@nestjs/testing';
import { SocketCodeEditorController } from './socket-code-editor.controller';

describe('SocketCodeEditorController', () => {
  let controller: SocketCodeEditorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocketCodeEditorController],
    }).compile();

    controller = module.get<SocketCodeEditorController>(SocketCodeEditorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
