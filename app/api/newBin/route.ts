import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Bin {
    size: string,
    binSizeId: string,
    charge: number
}

export async function POST(req: Request) {
    const body: Bin = await req.json();
    console.log(body)
    try {
        // const result = await prisma.bin.create({
        //     data: {                
                
        //     }
        // });
        // return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ message: 'Failed to create data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
