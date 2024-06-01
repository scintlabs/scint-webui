import { MDXRemote } from "next-mdx-remote/rsc"
import { TocComponents } from "@/app/theme/docs/components"

export default function TableOfContents({ content }: { content: string }) {
    const components = TocComponents()
    const options = {
        parseFrontmatter: true,
        mdxOptions: {
            rehypePlugins: []
        }
    }

    return (
        <aside id="toc" className="max-w-96 fixed pt-24 pr-24">
            <p className="uppercase text-[0.725rem] font-[700] mb-4 text-[#7c7c7d]">
                content
            </p>
            <ul className="text-[#8f9092] whitespace-nowrap overflow-ellipsis">
                <MDXRemote
                    source={content}
                    components={components}
                    options={options}
                />
            </ul>
        </aside>
    )
}
