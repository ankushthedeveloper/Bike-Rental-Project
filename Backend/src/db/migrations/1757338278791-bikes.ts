import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bikes1757338278791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    `
      CREATE TABLE IF NOT EXISTS bikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        year INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        distanceTraveled INTEGER NOT NULL,
      )
    `;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `
      DROP TABLE IF EXISTS bikes
    `;
  }
}
