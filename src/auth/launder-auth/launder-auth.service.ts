import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';

import { Launder } from '../../entities/launder.entity'
import { CreateLaunderDTO } from '../../launder/dto/create-launder.dto'; // create this dto
import { AuthPayloadDto } from '../dto/auth.dto';
import { UpdateProfileDto } from "../dto/update-profile.dto";
import {Order} from "../../entities/order.entity";

@Injectable()
export class LaunderAuthService {
    constructor(
        @InjectRepository(Launder)
        private readonly launderRepository: Repository<Launder>,
        private readonly jwtService: JwtService,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    private generateOtp(): { otp: string; otpExpires: Date } {
        const otp = (Math.floor(1000 + Math.random() * 9000)).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        return { otp, otpExpires };
    }

    private async sendOtpEmail(to: string, otp: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com', // Use environment variables for security
            port: parseInt(process.env.SMTP_PORT, 10) || 465,
            secure: true, // Use true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || 'bnetworksitsolutions@gmail.com', // Use environment variables
                pass: process.env.SMTP_PASS || 'jaea jpyv zrhp qnuh', // Use environment variables
            },
        });

        await transporter.sendMail({
            to,
            subject: 'Business Verification OTP',
            text: `Your OTP code is ${otp}`,
            html: `<b>Your OTP code is ${otp}</b>`,
        });
    }

    async register(createDto: CreateLaunderDTO): Promise<{ id: number; businessName: string; email: string }> {
        const { name, phone,  businessName, email, password, address, bankName,accountNumber, bankPin, state, ninOrBvn, business_reg_no, id_card_front, id_card_back } = createDto;

        const existing = await this.launderRepository.findOne({ where: { email } });
        if (existing) throw new ConflictException('Email already registered');

        const hashed = await bcrypt.hash(password, 10);
        const { otp, otpExpires } = this.generateOtp();

        const launder = this.launderRepository.create({
            name,
            phone,
            businessName,
            address,
            business_reg_no,
            id_card_front,
            id_card_back,
            bankName,
            accountNumber,
            bankPin,
            state,
            ninOrBvn,
            email,
            password: hashed,
            otp,
            otpExpires,
        });

        await this.launderRepository.save(launder);
        await this.sendOtpEmail(email, otp);

        return { id: launder.id, businessName: launder.businessName, email };
    }

    async resendOtp(email: string): Promise<{ message: string }> {
        const launder = await this.launderRepository.findOne({ where: { email } });
        if (!launder) throw new NotFoundException('Business not found');

        const { otp, otpExpires } = this.generateOtp();
        Object.assign(launder, { otp, otpExpires });

        await this.launderRepository.save(launder);
        await this.sendOtpEmail(email, otp);

        return { message: 'OTP resent successfully' };
    }

    async verifyOtp(email: string, otp: string): Promise<{ token: string }> {
        const launder = await this.launderRepository.findOne({ where: { email } });
        if (!launder) throw new NotFoundException('Business not found');

        if (launder.otp !== otp || new Date() > launder.otpExpires) {
            throw new BadRequestException('Invalid or expired OTP');
        }

        launder.otp = null;
        launder.otpExpires = null;
        await this.launderRepository.save(launder);

        const token = this.jwtService.sign({
            id: launder.id,
            businessName: launder.businessName,
            email: launder.email,
        });

        return { token };
    }

    async login(loginDto: AuthPayloadDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const launder = await this.launderRepository.findOne({ where: { email } });
        if (!launder || !(await bcrypt.compare(password, launder.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            id: launder.id,
            businessName: launder.businessName,
            email: launder.email,
        });

        return { token };
    }

    async updateLocation(
        id: number,
        lat: string,
        long: string,
        address: string,
    ): Promise<void> {
        const launder = await this.launderRepository.findOne({ where: { id } });
        if (!launder) throw new NotFoundException('Launder not found');

        Object.assign(launder, { lat, long, address });
        await this.launderRepository.save(launder);
    }

    async sendForgotPasswordOtp(email: string): Promise<{ message: string }> {
        const launder = await this.launderRepository.findOne({ where: { email } });
        if (!launder) throw new NotFoundException('Email not found');

        const { otp, otpExpires } = this.generateOtp();
        Object.assign(launder, { otp, otpExpires });

        await this.launderRepository.save(launder);
        await this.sendOtpEmail(email, otp);

        return { message: 'OTP sent to email' };
    }

    async resetPassword(email: string, newPassword: string): Promise<{ success: boolean; message: string }> {
        const launder = await this.launderRepository.findOne({ where: { email } });
        if (!launder) throw new NotFoundException('Business not found');

        launder.password = await bcrypt.hash(newPassword, 10);
        await this.launderRepository.save(launder);

        return { success: true, message: 'Password updated' };
    }

    async getProfile(id: number): Promise<Launder> {
        const launder = await this.launderRepository.findOne({ where: { id } });
        if (!launder) throw new NotFoundException('Profile not found');

        return launder;
    }

    async updateProfile(userId: any, dto: UpdateProfileDto) {
        const user = await this.launderRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        Object.assign(user, dto); // Or update fields individually
        return await this.launderRepository.save(user);
    }

    async getOrders(providerId: string, status?: string) {
        const query = this.orderRepository.createQueryBuilder('order')
            .where('order.providerId = :providerId', { providerId });

        if (status) {
            query.andWhere('order.status = :status', { status });
        }

        return query.getMany(); // Add pagination as needed
    }

    async getOrderById(providerId: string, orderId: string) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId }
        });
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async acceptOrder(providerId: string, orderId: string) {
        const order = await this.getOrderById(providerId, orderId);
        order.status = 'accepted';
        await this.orderRepository.save(order);

        // Notify client logic here
        return { message: 'Order accepted', status: order.status };
    }

    async declineOrder(providerId: string, orderId: string) {
        const order = await this.getOrderById(providerId, orderId);
        order.status = 'declined';
        await this.orderRepository.save(order);

        // Notify client & suggest alternatives
        return { message: 'Order declined', status: order.status };
    }

    async completeOrder(providerId: string, orderId: string) {
        const order = await this.getOrderById(providerId, orderId);
        order.status = 'completed';
        await this.orderRepository.save(order);

        // Notify client for confirmation
        return { message: 'Order marked as completed', status: order.status };
    }

}