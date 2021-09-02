import { Injectable } from '@nestjs/common';
import { environment } from 'src/configs/environment';
import { BaseCache } from '../redis/base.cache';
import { RedisConnection } from '../redis/redis.connection';

@Injectable()
export class IdempCache extends BaseCache<IdempData> {
  constructor(connection: RedisConnection) {
    super(
      `${environment.applicationName}:IdempData`,
      connection,
      environment.ttl.idempotency,
    );
  }
}

export class IdempData {
  idempotencyKey: string;
  bodyRequest: string;
  bodyResponse: string;
}
