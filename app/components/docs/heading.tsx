import React, { JSX } from "react"
import Link from "next/link"
import { DocHeadingProps, TocHeadingProps } from "@/app/lib/types"

function formatHashLink(text: React.ReactNode) {
    if (typeof text !== "string") return ""
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

export function DocHeading(tag: keyof JSX.IntrinsicElements) {
    const Component = ({ children, ...props }: DocHeadingProps) => (
        <Link href={`#${formatHashLink(children)}`}>
            {React.createElement(
                tag,
                { id: formatHashLink(children), ...props },
                children
            )}
        </Link>
    )

    Component.displayName = `DocHeading${
        tag.charAt(0).toUpperCase() + tag.slice(1)
    }`

    return Component
}

export function TocHeading(props: TocHeadingProps) {
    const levelNumber = parseInt(props.level.substring(1), 10)
    const paddingLeft = `${(levelNumber - 2) * 1}rem`

    return (
        <li className="h-8 pl-6 border-l border-[#272729] hover:border-l-1.5 hover:border-[#e3e2ee] hover:text-[#e3e2ee]">
            <Link href={`#${formatHashLink(props.children)}`} passHref>
                <span style={{ paddingLeft, ...props.style }} {...props}>
                    {props.children}
                </span>
            </Link>
        </li>
    )
}
