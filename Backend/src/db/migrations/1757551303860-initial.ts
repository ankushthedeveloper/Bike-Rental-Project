import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1757551303860 implements MigrationInterface {
  name = 'Initial1757551303860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "temporary_bikes" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "brand" varchar(50) NOT NULL,
            "model" varchar(50) NOT NULL,
            "year" integer NOT NULL,
            "price" decimal(10,2) NOT NULL,
            "created_at" datetime NOT NULL DEFAULT (datetime('now')),
            "distanceTraveled" integer NOT NULL,
            "images" text,
            "rentPerDay" integer NOT NULL DEFAULT 0,
            "isAvailable" boolean NOT NULL DEFAULT 1,
            "noOfBikes" integer NOT NULL DEFAULT 0
        )`);
    await queryRunner.query(`INSERT INTO "temporary_bikes"(
            "id", "brand", "model", "year", "price", "created_at", "distanceTraveled", "images",
            "rentPerDay", "isAvailable", "noOfBikes"
        ) SELECT
            "id", "brand", "model", "year", "price", "created_at", "distanceTraveled", "images",
            0, 1, 0
        FROM "bikes"`);
    await queryRunner.query(`DROP TABLE "bikes"`);
    await queryRunner.query(`ALTER TABLE "temporary_bikes" RENAME TO "bikes"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bikes" RENAME TO "temporary_bikes"`);
    await queryRunner.query(`CREATE TABLE "bikes" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "brand" varchar(50) NOT NULL,
            "model" varchar(50) NOT NULL,
            "year" integer NOT NULL,
            "price" decimal(10,2) NOT NULL,
            "created_at" datetime NOT NULL DEFAULT (datetime('now')),
            "distanceTraveled" integer NOT NULL,
            "images" text
        )`);
    await queryRunner.query(`INSERT INTO "bikes"(
            "id", "brand", "model", "year", "price", "created_at", "distanceTraveled", "images"
        ) SELECT
            "id", "brand", "model", "year", "price", "created_at", "distanceTraveled", "images"
        FROM "temporary_bikes"`);
    await queryRunner.query(`DROP TABLE "temporary_bikes"`);
  }
}
