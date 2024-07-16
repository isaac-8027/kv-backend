import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedExperiance1721129834326 implements MigrationInterface {
    name = 'AddedExperiance1721129834326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "experiance" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "statuss" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "statuss"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experiance"`);
    }

}
