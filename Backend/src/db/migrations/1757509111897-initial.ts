import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1757509111897 implements MigrationInterface {
  name = 'Initial1757509111897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bikeId" varchar NOT NULL, "userId" varchar NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bookings"`);
  }
}
