import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRestaurantOrderRestaurantToClient1730683121399 implements MigrationInterface {
    name = 'CreateRestaurantOrderRestaurantToClient1730683121399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."order_status_enum" AS ENUM(
                'AWAITING_PAYMENT',
                'AWAITIN_DELIVERY',
                'IN_TRANSIT',
                'DELIVERED',
                'COMPLETED',
                'CANCELLED'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "clientId" integer NOT NULL,
                "restaurantId" integer NOT NULL,
                "description" character varying NOT NULL,
                "status" "public"."order_status_enum" NOT NULL DEFAULT 'AWAITING_PAYMENT',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6460b51af77debd398aa60099ad" PRIMARY KEY ("clientId", "restaurantId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "restaurant" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "address" character varying NOT NULL,
                "capacity" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_9bf1c0e73dde0f6d1c3ff4f89a5" UNIQUE ("address"),
                CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "restaurant_to_client" (
                "restaurantId" integer NOT NULL,
                "clientId" integer NOT NULL,
                CONSTRAINT "PK_2e381d529d19f1b29d1f43887c6" PRIMARY KEY ("restaurantId", "clientId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5310cdf53e06424d95297b56c3" ON "restaurant_to_client" ("restaurantId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a32a988c932b00273dd9543123" ON "restaurant_to_client" ("clientId")
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_c93f22720c77241d2476c07cabf" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurant_to_client"
            ADD CONSTRAINT "FK_5310cdf53e06424d95297b56c3b" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurant_to_client"
            ADD CONSTRAINT "FK_a32a988c932b00273dd95431238" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "restaurant_to_client" DROP CONSTRAINT "FK_a32a988c932b00273dd95431238"
        `);
        await queryRunner.query(`
            ALTER TABLE "restaurant_to_client" DROP CONSTRAINT "FK_5310cdf53e06424d95297b56c3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_c93f22720c77241d2476c07cabf"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a32a988c932b00273dd9543123"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_5310cdf53e06424d95297b56c3"
        `);
        await queryRunner.query(`
            DROP TABLE "restaurant_to_client"
        `);
        await queryRunner.query(`
            DROP TABLE "restaurant"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."order_status_enum"
        `);
    }

}
