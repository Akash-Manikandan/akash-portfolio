import { compileMDX } from "next-mdx-remote/rsc"

interface MDXContentProps {
    source: string;
}

export default async function Markdown({ source }: MDXContentProps) {
    const { content } = await compileMDX<{ title: string }>({
        source: source,
        options: { parseFrontmatter: true },
    })

    return <div className="w-3/4 max-sm:w-auto">{content}</div>;
}