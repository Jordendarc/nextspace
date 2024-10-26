import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { withSession } from "@/utils/withSession";

export async function PUT(request: Request) {
    return await withSession(async (userId) => {
        const data = await request.json();
        data.age = Number(data.age);
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data,
        });
        return NextResponse.json(user);
    })
}