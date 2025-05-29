import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('launder') // Explicit table name
export class Launder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    businessName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    password: string; // Note: In production, you should hash this!

    @Column({ nullable: true })
    otp: string;

    @Column({ nullable: true, type: 'timestamp' })
    otpExpires: Date;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    ninOrBvn: string;

    @Column({ nullable: true })
    bankName: string;

    @Column({ nullable: true })
    accountNumber: string;

    @Column({ nullable: true })
    business_reg_no: string;

    @Column({ nullable: true })
    business_address: string;

    @Column({ nullable: true })
    id_card_front: string;

    @Column({ nullable: true })
    id_card_back: string;

    @Column({ nullable: true })
    business_cert_front: string;

    @Column({ nullable: true })
    business_cert_back: string;
}