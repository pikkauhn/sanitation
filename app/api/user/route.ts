import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

import OTPGen from "@/app/components/OTPGen";
import mailTransporter from "@/app/components/Transporter";

const prisma = new PrismaClient();

interface RequestBody {
    name: string,
    email: string,
    role: string,
    password: string,
}

export async function POST(req: NextApiRequest) {            
    if (req.method === 'POST') {
        try {
            const transporter = mailTransporter();
            const { otpCode, hashedOTP } = await OTPGen();

            const passedValue = await new Response(req.body).text();
            const body: RequestBody = JSON.parse(passedValue);

            const { name, email, role, password } = body;
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
               return NextResponse.json({ message: 'User already exists' }, { status: 400 });                
            }

            const hashedPassword = await argon2.hash(password);
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    roles: role,
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
                from: 'test@searcywater.org',
                to: email,
                subject: 'Your OTP for Verification',
                text: `Your OTP is: ${otpCode}`,
            };

            await transporter.sendMail(mailOptions);
           return NextResponse.json({ message: user.id }, { status: 200 });
        } catch (error) {
            console.error('Error: ', error);
           return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    } else {
       return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
    }
}