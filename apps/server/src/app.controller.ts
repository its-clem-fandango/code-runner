import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('answer')
  submitCode(@Body() codeData: { code: string }): any {
    // Handle the submitted code here. For example, you could pass it to a service.
    // The `codeData` parameter will contain the submitted code assuming the request body
    // is in the format { "code": "your_code_here" }
    return this.appService.processCodeSubmission(codeData.code);
  }
}
