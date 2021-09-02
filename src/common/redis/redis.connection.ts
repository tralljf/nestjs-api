import { Injectable, OnModuleInit } from '@nestjs/common';
import { SecretsManager } from 'aws-sdk';
import { environment } from 'src/configs/environment';
import { RedisConfig } from './redis.config';
const redis = require('redis');

@Injectable()
export class RedisConnection implements OnModuleInit {
  private static sm = new SecretsManager();
  private redisClient = null;
  private redisConfig: RedisConfig = new RedisConfig();
  private isStarted = false;

  getClient() {
    if (this.isStarted && this.redisClient == null) {
      this.redisClient = redis.createClient(
        parseInt(this.redisConfig.port),
        this.redisConfig.host,
      );

      this.redisClient.on('connect', function () {
        console.log('connected');
      });

      this.redisClient.on('error', function (error) {
        console.error(error);
      });
    }
    return this.redisClient;
  }

  onModuleInit() {
    const redisConnection = this;
    redisConnection
      .loadCredentials()
      .then(function () {
        redisConnection.isStarted = true;
      })
      .then((err) => {
        console.error(err);
      });
  }

  private async loadCredentials(): Promise<RedisConfig> {
    const redisConfig = this.redisConfig;
    return new Promise((resolver, reject) => {
      if (environment.isDevelopment() == false) {
        RedisConnection.sm.getSecretValue(
          { SecretId: 'ConnectionStrings__RedisCluster' },
          function (err, data) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              const urlSplitted = data.SecretString.split(':');
              redisConfig.host = urlSplitted[0];
              redisConfig.port = urlSplitted[1];
              resolver(redisConfig);
            }
          },
        );
      } else {
        const urlSplitted = process.env.REDIS_CONNECTION.split(':');
        redisConfig.host = urlSplitted[0];
        redisConfig.port = urlSplitted[1];
        resolver(this.redisConfig);
      }
    });
  }
}
