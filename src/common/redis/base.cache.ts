import { RedisConnection } from './redis.connection';

export abstract class BaseCache<TValue> {
  constructor(
    protected baseKey: string,
    protected connection: RedisConnection,
    protected ttl: number = 0,
  ) {}

  public set(key: string, value: TValue): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      const fullKey = `${this.baseKey}:${key}`;
      var jsonValue = JSON.stringify(value);
      const client = this.connection.getClient();

      const funcCallBack = function (err, reply) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(true);
        }
      };

      if (this.ttl > 0) {
        client.set(fullKey, jsonValue, 'EX', this.ttl, funcCallBack);
      } else {
        client.set(fullKey, jsonValue, funcCallBack);
      }
    });
  }

  public get(key: string): Promise<TValue> {
    return new Promise<TValue>((resolve, reject) => {
      const fullKey = `${this.baseKey}:${key}`;
      const client = this.connection.getClient();
      client.get(fullKey, function (err, jsonValue) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          var objValue = JSON.parse(jsonValue);
          resolve(objValue);
        }
      });
    });
  }

  public deleteKey(key: string): Promise<void> {
    return new Promise<any>((resolver, reject) => {
      const fullKey = `${this.baseKey}:${key}`;
      const client = this.connection.getClient();
      client.del(fullKey, function (err, reply) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolver(true);
        }
      });
    });
  }
}
