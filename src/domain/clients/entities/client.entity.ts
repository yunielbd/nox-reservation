import { RegistryDates } from "common/embedded/registry-dates.embedded";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true })
    phone: string;
    @Column()
    age: number;
    @Column(() => RegistryDates, { prefix: false })
    registryDates: RegistryDates;
}
