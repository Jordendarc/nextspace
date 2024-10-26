export const dynamic = "force-dynamic";
export const revalidate = 420;

interface Post {
    title: string;
    content: string;
    slug: string;
}

interface Props {
    params: { slug: string };
}
export async function generateStaticParams() {
    const posts = [
        {
            title: "Lorem Ipsum",
            slug: "lorem-ipsum",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
        },
        {
            title: "Dolor Sit Amet",
            slug: "dolor-sit-amet",
            content:
                "Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
        },
        {
            title: "Consectetur Adipiscing",
            slug: "consectetur-adipiscing",
            content:
                "Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
        },
        {
            title: "Integer Nec Odio",
            slug: "integer-nec-odio",
            content:
                "Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.",
        },
        {
            title: "Praesent Libero",
            slug: "praesent-libero",
            content:
                "Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.",
        },
    ];
    return posts.map((post: Post) => ({ slug: post.slug }));
}
export default async function BlogPostPage({ params }: Props) {
    const posts = await fetch(process.env.NEXT_PUBLIC_URL +  `/api/content`).then((res) => res.json());
    const post = posts.find((post: Post) => post.slug === params.slug);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}
