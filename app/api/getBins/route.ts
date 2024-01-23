import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest) {
    if (req.method === 'POST') {
        try {

            const result = await prisma.bin.findMany({});
            console.log(result);
            return NextResponse.json({ result }, { status: 200 });
        } catch (error) {
            console.error('Error: ', error);
            return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
    }
}