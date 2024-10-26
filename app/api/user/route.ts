import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const data = await request.json();
    data.age = Number(data.age);
    const user = await prisma.user.update({
        where: { 
            email: currentUserEmail 
        },
        data,
    });
    return NextResponse.json(user);
}