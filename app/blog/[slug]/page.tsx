export const dynamic = 'force-dynamic'
export const revalidate = 420

interface Post {
    title: string;
    content: string;
    slug: string;
}

interface Props {
    params: { slug: string };
}
export async function generateStaticParams() {
    const posts = await fetch(process.env.URL + `/api/content`).then((res) => res.json());
    return posts.map((post: Post) => ({ slug: post.slug }));
}
export default async function BlogPostPage({ params }: Props) {
    const posts = await fetch(`/api/content`).then((res) => res.json());
    const post = posts.find((post: Post) => post.slug === params.slug);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}