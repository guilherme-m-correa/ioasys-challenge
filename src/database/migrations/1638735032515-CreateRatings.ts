import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRatings1638735032515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'ratings',
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
          name: 'movie_id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'score',
          type: 'integer',
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
      foreignKeys: [
        {
          name: 'MovieRating',
          referencedTableName: 'movies',
          referencedColumnNames: ['id'],
          columnNames: ['movie_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'UserRating',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    });

    queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings');
  }
}
