import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): object {
    return {
      status: 'OK',
      message: 'Application is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
