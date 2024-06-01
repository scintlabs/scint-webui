import remarkHTML from "remark-html"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"

export const RenderMarkdown = ({ content }: { content: string }) => {
    const parsedMarkdown = unified()
        .use(remarkParse)
        .use(remarkHTML)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .processSync(content)
        .toString()

    return <div dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
}
