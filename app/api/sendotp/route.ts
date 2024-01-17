import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function setExpire() {
    const d = new Date();
    d.setTime(d.getTime() + (60*60*1000));
    return d;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const expire = setExpire();
    const otpCode = 9; // Create OTP generator for this - include bcrypt
    const otp = await prisma.oTP.create({
        data: {
            userId: '...',
            code: otpCode,
            expirationDateTime: expire,
        },
    });

    const transporter = nodemailer.createTransport({
        //  Setup for email provider
    });

    const mailOptions = {
        from: 'z.burns@searcywater.org',
        to: req.body.email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is: ${otpCode}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send OTP' })
    }
}