import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMovies1638734204868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'movies',
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
          name: 'description',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'duration',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'release_date',
          type: 'timestamp',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'director_id',
          type: 'uuid',
          isNullable: false,
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
          name: 'MovieDirector',
          columnNames: ['director_id'],
          referencedTableName: 'directors',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    });

    queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}
