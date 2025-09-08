import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1757338254174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        role VARCHAR(20) DEFAULT 'user',
        token VARCHAR(255) DEFAULT NULL
      )
    `;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `
      DROP TABLE IF EXISTS users
    `;
  }
}
