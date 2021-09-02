import { Injectable, Scope } from '@nestjs/common';
import { environment } from 'src/configs/environment';
import { IdempCache, IdempData } from './idemp.cache';
import { IdempDml } from './idemp.dml';

@Injectable()
export class IdempService {
  private static preKey: string = 'DLM';
  private lock: any = null;

  constructor(private cache: IdempCache, private dml: IdempDml) {}

  async get(key: string): Promise<IdempData> {
    try {
      if (!this.dml.isConnected()) {
        throw 'Redis not connectd';
      }
      let data: IdempData = await this.cache.get(key);
      if (data) {
        return data;
      }

      const dlmKey = `${environment.applicationName}:${IdempService.preKey}:${key}`;
      const ttl: number = 180 * 1000;
      const redlock = this.dml.getRedlock();

      this.lock = await redlock.lock(dlmKey, ttl);
      data = await this.cache.get(key);

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async put(idempData: IdempData) {
    if (!this.dml.isConnected()) {
      throw 'Redis not connectd';
      return;
    }
    try {
      await this.cache.set(idempData.idempotencyKey, idempData);
    } catch (err) {
      console.info(err);
      throw err;
    }
  }

  async finish() {
    if (this.lock) {
      await this.lock.unlock();
    }
  }
}
