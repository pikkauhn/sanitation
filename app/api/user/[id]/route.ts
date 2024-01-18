import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

import OTPGen from "@/app/components/OTPGen";
import mailTransporter from "@/app/components/Transporter";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const transporter = mailTransporter();
        const { otpCode, hashedOTP } = await OTPGen();

        const { email, password, name, roles } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await argon2.hash(password);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                roles,
                emailVerified: null,
                password: hashedPassword,
            }
        });

        const expirationDateTime = new Date(Date.now() + 60 * 60 * 1000);
        const otp = await prisma.oTP.create({
          data: {
            userId: user.id,
            code: hashedOTP,
            expirationDateTime,
          },
        });

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL_USER,
            to: req.body.email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otpCode}`,
          };

          await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Failed to create user' });
    } finally {
        await prisma.$disconnect();
    }
}