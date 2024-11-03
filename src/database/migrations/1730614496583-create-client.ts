import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClient1730614496583 implements MigrationInterface {
    name = 'CreateClient1730614496583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "age" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"),
                CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"),
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "client"
        `);
    }

}
