import { Client } from "clients/entities/client.entity";
import { RegistryDates } from "common/embedded/registry-dates.embedded";
import { Order } from "order/entities/order.entity";
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity, OneToMany } from "typeorm";

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ unique: true })
    address: string;
    @Column()
    capacity: number;
    @Column(() => RegistryDates, { prefix: false })
    registryDates: RegistryDates;

    @ManyToMany(() => Client, (client) => client.restaurants)
    @JoinTable({name:'restaurant_to_client'})
    clients: Client[];

    @OneToMany( () => Order, (order) => order.restaurant, { cascade:true } )
    orders: Order[];

    // get isFull(): boolean {
    //     return this.capacity <= this.orders?.length;
    // }

}
