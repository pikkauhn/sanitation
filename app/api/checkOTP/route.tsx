import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { otp, userId } = req.body;

            const otpRecord = await prisma.oTP.findUnique({
                where: { id: userId, isVerified: false },
            });

            if (!otpRecord) {
                return res.status(404).json({ message: 'OTP not found or already verified' });
            }

            const isMatch = await argon2.verify(otpRecord.code, otp);
            if (isMatch) {
                await prisma.oTP.update({
                    where: { id: otpRecord.id },
                    data: { isVerified: true },
                });
                res.status(200).json({ message: 'OTP verified successfully' });
            } else {
                res.status(400).json({ message: 'Invalid OTP' });
            }
        } catch (error) {
            console.error('Error verifying OTP: ', error);
            res.status(500).json({ message: 'Failed to verify OTP' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}