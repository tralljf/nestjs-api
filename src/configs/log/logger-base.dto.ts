import * as moment from 'moment';
import { environment } from '../environment';
const os = require('os');

export abstract class LoggerBase {
  constructor() {
    this.created = moment().toDate();
    this.machineName = os.hostname();
    this.applicationName = environment.applicationName;
  }

  title: string;
  sourceType: SourceType;
  created: Date;
  isSuccess: boolean;
  elapsed: number;
  error: string;
  correlationId: string;
  machineName: string;
  ip: string;
  applicationName: string;
}

export enum SourceType {
  HTTP,
  TCP_KAFKA,
}
