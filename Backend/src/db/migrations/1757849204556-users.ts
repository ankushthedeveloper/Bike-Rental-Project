import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1757849204556 implements MigrationInterface {
    name = 'Users1757849204556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(100) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar(20) NOT NULL DEFAULT ('user'), "authToken" varchar(255), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at", "role") SELECT "id", "name", "email", "password", "created_at", "role" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(100) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar(20) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "created_at", "role") SELECT "id", "name", "email", "password", "created_at", "role" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
