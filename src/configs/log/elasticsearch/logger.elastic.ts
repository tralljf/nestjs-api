/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from '@elastic/elasticsearch';
import { environment } from 'src/configs/environment';
import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
require('dotenv').config({ path: environment.fileName() });

export class LoggerElastic {
  public static GetTransport(): ElasticsearchTransport {
    const client = new Client({
      node: process.env.ELASTIC_NODE,
      name: 'Elastic',
    });

    client
      .ping({}, { requestTimeout: 3000 })
      .catch((err) => console.error('ELASTICSEARCH: Error on connection', err));

    const esTransportOpts = {
      level: 'info',
      indexPrefix: 'bankly.core.crypto.conversion',
      indexSuffixPattern: 'YYYY.MM',
      ensureIndexTemplate: false,
      stdout: true,
      client: client,
    };

    const esTransport = new ElasticsearchTransport(esTransportOpts);
    esTransport.on('error', (error) => {
      console.error('Error in logger transport caught', error);
    });

    return esTransport;
  }

  public static GetLogger(): winston.Logger {
    const esTransport = this.GetTransport();

    const logger = winston.createLogger({
      transports: [esTransport],
    });

    logger.on('error', (error) => {
      console.error('Error in logger caught', error);
    });

    return logger;
  }
}
