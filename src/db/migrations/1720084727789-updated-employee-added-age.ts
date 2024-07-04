import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEmployeeAddedAge1720084727789 implements MigrationInterface {
    name = 'UpdatedEmployeeAddedAge1720084727789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
