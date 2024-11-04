import { RegistryDates } from "common/embedded/registry-dates.embedded";
import { Order } from "order/entities/order.entity";
import { Restaurant } from "restaurant/entities/restaurant.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /**
     * Email address an phone number are considered indetifiable data
     * for a client, so they must be unique
     */
    @Column({ unique: true })
    email: string;

    /**
     * Email address an phone number are considered indetifiable data
     * for a client, so they must be unique
     */
    @Column({ unique: true })
    phone: string;

    @Column()
    age: number;

    @Column( () => RegistryDates, { prefix: false } )
    registryDates: RegistryDates;

    @ManyToMany( () => Restaurant, (restaurant) => restaurant.clients)
    restaurants: Restaurant[];

    @OneToMany( () => Order, (order) => order.client, { cascade:true } )
    orders: Order[];
}
