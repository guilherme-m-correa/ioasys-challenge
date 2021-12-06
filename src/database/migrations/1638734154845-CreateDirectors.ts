import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDirectors1638734154845
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'directors',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
      ],
    });

    queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('directors');
  }
}
