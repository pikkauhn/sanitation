import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const result = await prisma.bin.findMany({
            include: {
                location: true
            }
        });      
        return NextResponse.json( result, { status: 200 });
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
