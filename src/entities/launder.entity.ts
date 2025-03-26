import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('launder') // Explicit table name
export class Launder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    password: string; // Note: In production, you should hash this!

    @Column({ nullable: false })
    state: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    ninOrBvn: string;

    @Column({ nullable: false })
    bankName: string;

    @Column({ nullable: false })
    accountNumber: string;
}