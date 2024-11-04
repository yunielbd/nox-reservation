import { Client } from "clients/entities/client.entity";
import { IsEntity } from "common/decorators/is-entity.decorator";
import { RegistryDates } from "common/embedded/registry-dates.embedded";
import { OrderStatus } from "order/enums/order-status.enum";
import { Restaurant } from "restaurant/entities/restaurant.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    clientId: number;

    @Column()
    restaurantId: number;

    @Column()
    description: string;


    /**
     * adding a enum defined status,
     *  just for fun  
     */
    @Column({
        type: 'enum',
        enum: OrderStatus, 
        default: OrderStatus.AWAITING_PAYMENT })
      status: OrderStatus;

    @Column(() => RegistryDates, { prefix: false })
    registryDates: RegistryDates;
  
    @ManyToOne(() => Client,{cascade:false})
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @ManyToOne(() => Restaurant,{cascade:false})
    @JoinColumn({ name:'restaurantId' })
    restaurant: Restaurant;
}
