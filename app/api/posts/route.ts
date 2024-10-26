import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { withSession } from '@/utils/withSession';
import { profanity } from '@2toad/profanity';

export async function GET() {
    return await withSession(async () => {
        const getBlogPosts = await prisma.post.findMany({
            take: 20,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });
        return NextResponse.json(getBlogPosts);
    });
}
export async function POST(req: Request) {
    return await withSession(async (userId) => {
        const data = await req.json();
        const cleanContent = profanity.censor(data.content);
        const cleanTitle = profanity.censor(data.title);
        const record = await prisma.post.create({
            data: {
                title: cleanTitle,
                content: cleanContent,
                authorId: userId,
            }
        });
        return NextResponse.json(record);
    });
}
// export async function DELETE(request: NextRequest) {
//     const session = await getServerSession(authOptions);
//     const currentUserEmail = session?.user?.email!;
//     const targetUserId = request.nextUrl.searchParams.get('targetUserId');
//     const currentUserId = await prisma.user
//         .findUnique({ where: { email: currentUserEmail }, })
//         .then((user) => user?.id!);
//     const follow = await prisma.follows.delete({
//         where: {
//             followerId_followingId: {
//                 followerId: currentUserId,
//                 followingId: targetUserId!,
//             },
//         },
//     });
//     return NextResponse.json(follow);
// }