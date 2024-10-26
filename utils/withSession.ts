import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function withSession(req: Request, next: (userId: string) => Promise<NextResponse>) {
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