import { compileMDX } from "next-mdx-remote/rsc"

interface MDXContentProps {
    source: string;
    className?: string;
}

export default async function Markdown({ source, className }: MDXContentProps) {
    const { content } = await compileMDX<{ title: string }>({
        source: source,
        options: { parseFrontmatter: true },
    })

    return <div className={className}>{content}</div>;
}