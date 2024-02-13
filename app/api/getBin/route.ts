import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RequestBody {
    id: string;
}

export async function POST(request: Request) {
    const body:RequestBody = await request.json();
    const id = body.id;    
    try {
        const result = await prisma.bin.findFirst({
            where: {
                id
            },
            include: {
                size: true,
                location: true,
                history: true,
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
