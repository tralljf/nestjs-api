import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderBook1630537284364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'prices',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'exchange',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'final_price',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'currency',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'deepth_amount',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'sell_price',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'exchange_sell_book',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'exchange_top_sell_price',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'buy_price',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'exchange_buy_book',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'exchange_top_buy_price',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('prices');
  }
}
