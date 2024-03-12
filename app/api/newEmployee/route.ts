import prisma from "@/app/lib/prisma";

interface RequestBody {
    employeeId: number;
    phone: string;
    firstname:string;
    lastname:string;
    dept: string;
    isAdmin: boolean;
    yearly: number;
    balance: number;
}

export async function POST(request: Request){
    const body:RequestBody = await request.json();

    const user = await prisma.user.create({
        data:{
            employeeId: body.employeeId,
            firstname: body.firstname,
            lastname: body.lastname,
            dept: body.dept,
            isAdmin: body.isAdmin,
            phone: body.phone,
            password: '',            
        },
    });
    const timeOff = await prisma.timeOffBalance.create({
        data:{
            userId: body.employeeId,
            year: body.yearly,
            balance: body.balance,
        },
    })

    const {password, ...result} = user;    
    const setTime = timeOff;


    return new Response(JSON.stringify(result));
}