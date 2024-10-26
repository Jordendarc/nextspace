import CreatePost from "@/components/CreatePost/CreatePost";
import PostComponent from "@/components/Posts/Post";
import { cookies } from "next/headers";
import styles from '@/components/Posts/Post.module.css';
import { PostWithAuthor } from "@/utils/types";

async function getBlogPosts() {
    const posts = await fetch(process.env.NEXT_PUBLIC_URL +  `/api/posts`, {
        headers: {
            Cookie: cookies().toString(),
        },
        credentials: "include",
    }).then((res) => res.json());
    return posts;
}

export default async function Blog() {
    const posts: PostWithAuthor[] = await getBlogPosts();
    return (
        <div>
            <h1>Blog</h1>
            <CreatePost />
            <p>Recent posts:</p>
            <div className={styles.postsContainer}>
                {posts.length > 0
                ? (
                    posts.map((post: PostWithAuthor) => {
                        return <PostComponent key={post.id} post={post} />;
                    })
                )
                : <p>No posts found. :(</p>}
            </div>
            
        </div>
    );
}
