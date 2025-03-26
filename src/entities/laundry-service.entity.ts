import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('laundry_services')
export class LaundryService {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    type: string; // e.g., "washing", "dry cleaning"
}
