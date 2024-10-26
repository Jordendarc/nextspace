import { NextApiRequest } from 'next';
import { Prisma } from '@prisma/client';

declare module 'next' {
    export interface NextApiRequest {
        userId?: string;
    }
}
export type PostWithAuthor = Prisma.PostGetPayload<{
    include: { author: true };
}>;