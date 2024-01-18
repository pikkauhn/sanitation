import bcrypt from 'bcrypt'

export default async function OTPGen(): Promise<{ otpCode: string; hashedOTP: string }> {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate 6-digit random number
    const otpCode = randomNumber.toString().padStart(6, '0');

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otpCode, saltRounds);

    return { otpCode, hashedOTP };
}