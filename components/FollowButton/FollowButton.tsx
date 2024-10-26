import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import FollowClient from './FollowClient';
import { authOptions } from '@/utils/authOptions';


interface Props {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
  let userId = null
  let isFollowing = null
  const session = await getServerSession(authOptions);
  if(session?.user?.email) {
    userId = await prisma.user
      .findFirst({ where: { email: session?.user?.email } })
      .then((user) => user?.id)
    isFollowing = await prisma.follows.findFirst({
      where: { followerId: userId, followingId: targetUserId },
    });
  }
  return (
    userId && <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  )
}