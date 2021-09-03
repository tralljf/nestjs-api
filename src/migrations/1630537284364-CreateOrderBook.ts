import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderBook1630537284364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_book',
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
            name: 'currency',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'sell_rate',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'buy_rate',
            isNullable: true,
            type: 'decimal(14,2)',
          },
          {
            name: 'sell_book',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'buy_book',
            isNullable: true,
            type: 'varchar',
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
    await queryRunner.dropTable('order_book');
  }
}
