import prisma from "@/app/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import * as argon2 from "argon2";

interface RequestBody {
    otp: string,
}

export async function POST(req: NextApiRequest) {
    if (req.method === 'POST') {
        const cookieStore = cookies();
        const userIdCookie = cookieStore.get('userId');
        const userId = userIdCookie?.value;

        try {
            if (userId) {                
                const passedValue = await new Response(req.body).text();
                const body: RequestBody = JSON.parse(passedValue);
                const { otp } = body;

                const otpRecord = await prisma.oTP.findFirst({
                    where: { userId: userId, isVerified: false },
                });

                if (!otpRecord) {
                    return NextResponse.json({ message: 'OTP not found or already verified' }, { status: 404 });
                }

                const isMatch = await argon2.verify(otpRecord.code, otp);
                if (isMatch) {
                    await prisma.oTP.update({
                        where: { id: otpRecord.id },
                        data: { isVerified: true },
                    });
                    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
                } else {
                    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
                }
            } else {
                return NextResponse.json({ message: 'User not in cookies or header, they need to attempt to log in again' }, { status: 404 })
            }
        } catch (error) {
            console.error('Error verifying OTP: ', error);
            return NextResponse.json({ message: 'Failed to verify OTP' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
}