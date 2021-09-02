import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisConnection } from '../redis/redis.connection';
let Redlock = require('redlock');
import ResourceLockedError from 'redlock';

@Injectable()
export class IdempDml implements OnModuleInit {
  private redLock = null;

  constructor(private connection: RedisConnection) {}

  getRedlock = () => this.redLock;

  isConnected() {
    return this.connection.getClient().connected;
  }

  onModuleInit() {
    const client = this.connection.getClient();
    this.redLock = new Redlock([client], {
      retryCount: 1,
      retryDelay: 400,
    });

    this.redLock.on('clientError', (error) => {
      if (error instanceof ResourceLockedError) {
        return;
      }

      console.error(error);
    });
  }
}
