import { Module } from "@nestjs/common";
import { SocketCodeEditorController } from "./socket-code-editor.controller";
import { SocketCodeEditorService } from "./socket-code-editor.service";

@Module({
  controllers: [SocketCodeEditorController],
  providers: [SocketCodeEditorService],
})
export class SocketCodeEditorModule {}
