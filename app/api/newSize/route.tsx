import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface binSize {
    size: string,
    charge: number,
}

export async function POST(req: Request) {
    const body: binSize = await req.json();
    console.log(body)
    try {
        const result = await prisma.binSize.create({
            data: {
                size: body.size,
                charge: body.charge
            }
        });      
        return NextResponse.json( result, { status: 200 });
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ message: 'Failed to create data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
