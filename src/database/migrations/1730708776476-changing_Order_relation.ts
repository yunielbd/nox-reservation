import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingOrderRelation1730708776476 implements MigrationInterface {
    name = 'ChangingOrderRelation1730708776476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "orderId" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "PK_6460b51af77debd398aa60099ad"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "PK_b7bb6a0fef36d2ee82137130b92" PRIMARY KEY ("clientId", "restaurantId", "orderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_c93f22720c77241d2476c07cabf"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "PK_b7bb6a0fef36d2ee82137130b92"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "PK_4f890fa5d689580f3c030c77a04" PRIMARY KEY ("restaurantId", "orderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "PK_4f890fa5d689580f3c030c77a04"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "PK_b075313d4d7e1c12f1a6e6359e8" PRIMARY KEY ("orderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_c93f22720c77241d2476c07cabf" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_c93f22720c77241d2476c07cabf"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "PK_b075313d4d7e1c12f1a6e6359e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "PK_4f890fa5d689580f3c030c77a04" PRIMARY KEY ("restaurantId", "orderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "PK_4f890fa5d689580f3c030c77a04"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "PK_b7bb6a0fef36d2ee82137130b92" PRIMARY KEY ("clientId", "restaurantId", "orderId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_c93f22720c77241d2476c07cabf" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "PK_b7bb6a0fef36d2ee82137130b92"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "PK_6460b51af77debd398aa60099ad" PRIMARY KEY ("clientId", "restaurantId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "orderId"
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
