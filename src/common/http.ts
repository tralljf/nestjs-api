import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class QuotesService {
  constructor(private http: HttpService) {}

  async getQuotes(url) {
    return await this.http.get(url);
  }
}
