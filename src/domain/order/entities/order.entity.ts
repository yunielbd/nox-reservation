import { Client } from "clients/entities/client.entity";
import { RegistryDates } from "common/embedded/registry-dates.embedded";
import { OrderStatus } from "order/enums/order-status.enum";
import { Restaurant } from "restaurant/entities/restaurant.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Order {

    @PrimaryColumn()
    clientId: number;

    @PrimaryColumn()
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
  
    @ManyToOne(() => Client, (client) => client.orders, { onDelete: 'CASCADE' })
    client: Client;
    @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
    restaurant: Restaurant;
}
