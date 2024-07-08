import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720413161650 implements MigrationInterface {
    name = 'Migrations1720413161650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_name" character varying`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "pincode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_ab4b655f2251cdc2acb9447a6d5" FOREIGN KEY ("department_name") REFERENCES "department"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_ab4b655f2251cdc2acb9447a6d5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "pincode" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_name"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
