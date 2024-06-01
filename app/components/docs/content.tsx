import React from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Product } from "@/app/lib/types"
import { DocComponents } from "@/app/theme/docs/components"

interface ContentProps {
    content: string
    product: Product
}

export default async function Content(props: ContentProps) {
    const { content, product } = props
    const components = DocComponents(product)
    const options = {
        parseFrontmatter: true,
        mdxOptions: {
            rehypePlugins: []
        }
    }

    return (
        <div id="mdx" className="flex flex-col shrink mt-10">
            <MDXRemote
                source={content}
                components={components}
                options={options}
            />
        </div>
    )
}
