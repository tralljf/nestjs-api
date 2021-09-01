import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class HealthController {
  @Get('/liveness')
  @ApiExcludeEndpoint()
  public isAlive() {
    return {
      status: 'Healthy',
    };
  }

  @Get('/hc')
  @ApiExcludeEndpoint()
  @HealthCheck()
  public async check() {
    return {
      status: 'Healthy',
    };
  }
}
