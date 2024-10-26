import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from './authOptions';

export async function withSession(next: (userId: string) => Promise<NextResponse>) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    return next(user.id)
}