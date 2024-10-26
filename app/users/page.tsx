import { prisma } from '@/lib/prisma';
import UserCard from '@/components/UserCard/UserCard';
import styles from '@/app/page.module.css';

export default async function Users() {
    const users = await prisma.user.findMany();
    return (
        <div className={styles.grid}>
           {users.map((user) => {
                return <UserCard key={user.id} {...user} />;
           })}
        </div>
    );
}