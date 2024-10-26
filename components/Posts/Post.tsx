"use client";

import styles from "./Post.module.css";
import Image from "next/image";
import { PostWithAuthor } from "@/utils/types";
import Link from "next/link";

interface Props {
    post: PostWithAuthor;
}
export default function PostComponent({ post }: Props) {
    return (
        <div className={styles.post}>
            <div className={styles.flex}>
                <Link href={`/users/${post.author.id}`}>
                    <Image
                        src={post?.author?.image || "/mememan.webp"}
                        alt="mememan"
                        width={100}
                        height={100}
                    />
                </Link>
                <p>By {post.author.name}</p>
            </div>

            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className={styles.flex}>
                <p>
                    created: 
                    {new Date(post.createdAt).toLocaleDateString(
                         "en-us",
                    )}
                </p>
                <p>
                    updated: 
                    {new Date(post.updatedAt).toLocaleDateString(
                        "en-us",
                    )}
                </p>
            </div>
        </div>
    );
}
