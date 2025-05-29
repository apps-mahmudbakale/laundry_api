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
import { AuthPayloadDto } from '../dto/auth.dto'; // create this dto

@Injectable()
export class LaunderAuthService {
    constructor(
        @InjectRepository(Launder)
        private readonly launderRepository: Repository<Launder>,
        private readonly jwtService: JwtService,
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
        const { name, phone,  businessName, email, password } = createDto;

        const existing = await this.launderRepository.findOne({ where: { email } });
        if (existing) throw new ConflictException('Email already registered');

        const hashed = await bcrypt.hash(password, 10);
        const { otp, otpExpires } = this.generateOtp();

        const launder = this.launderRepository.create({
            name,
            phone,
            businessName,
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

}