import { prisma } from '@/lib/prisma';
import { withSession } from '@/utils/withSession';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
    return await withSession(async (userId) => {
        const { targetUserId } = await req.json();
        const currentUserId = userId
        const record = await prisma.follows.create({
            data: {
                followerId: currentUserId,
                followingId: targetUserId,
            }
        });
        return NextResponse.json(record);
    })
}
export async function DELETE(req: NextRequest) {
    return await withSession(async (userId) => {
        const targetUserId = req.nextUrl.searchParams.get('targetUserId');
        const currentUserId = userId
        const follow = await prisma.follows.delete({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: targetUserId!,
                },
            },
        });
        return NextResponse.json(follow);
    })
}