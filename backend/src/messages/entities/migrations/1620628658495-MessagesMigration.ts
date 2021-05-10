import {MigrationInterface, QueryRunner} from "typeorm";

export class MessagesMigration1620628658495 implements MigrationInterface {
    name = 'MessagesMigration1620628658495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "from" integer NOT NULL, "to" integer NOT NULL, "payload" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
