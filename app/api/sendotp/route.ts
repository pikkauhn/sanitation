import { NextApiRequest, NextApiResponse } from "next";
import mailTransporter from '../../components/Transporter'
import { PrismaClient } from '@prisma/client';
import OTPGen from '../../components/OTPGen'

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const transporter = mailTransporter();
      const { otpCode, hashedOTP } = await OTPGen();
      const user = await prisma.user.findUnique({
        where: { email: req.body.user },
        select: { id: true }, 
      });
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
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
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    } finally {
      await prisma.$disconnect();
    }
  }