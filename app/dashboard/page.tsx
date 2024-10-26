import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";
import { authOptions } from "@/utils/authOptions";
import { User } from "@prisma/client";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin");
    }
    const currentUserEmail = session?.user?.email;
    const user: User | null = await prisma.user.findFirst({ where: { email: currentUserEmail } });
    if (!user) {
        redirect("/api/auth/signin");
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <ProfileForm user={user} />
        </div>
    );
}