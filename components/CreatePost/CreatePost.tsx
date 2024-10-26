"use client";

import { useState } from "react";

export default function CreatePost() {
    const [showPostForm, setShowPostForm] = useState<boolean>(false)
    const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            title: formData.get("title"),
            content: formData.get("content"),
        };

        const res = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        await res.json();
    };
    return (
        <div>
            <button
                onClick={() => {
                    setShowPostForm(true);
                }}
            >
                Create a new post
            </button>
             {showPostForm && (
                <form onSubmit={createPost}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" />
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" name="content" />
                    <button type="submit">Submit</button>
                </form>
            )}       
        </div>
    );
}
