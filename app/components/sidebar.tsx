"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

interface SidebarListItemProps {
    sku: string
    name: string
    path: string[]
    label: string
}

function SidebarListItem({ sku, name, path, label }: SidebarListItemProps) {
    const cleanPath = path.slice(2, -1).join("/")
    const pathname = usePathname()
    const pathSegments = pathname.split("/")
    const activePath = pathSegments[pathSegments.length - 1]
    let activeState = activePath === name.replace(".mdx", "")

    return (
        <>
            <li className={`h-7 w-full rounded-md text-md`} key={label}>
                <Link
                    href={`/${sku}/${cleanPath}/${name.replace(".mdx", "")}`}
                    className={`h-full w-full flex items-center rounded-md hover:text-[#89b73f] hover:bg-[#222326] ${
                        activeState ? "bg-[#222326] text-[#e3e2ee]" : "bg-none"
                    }`}
                >
                    {label}
                </Link>
            </li>
        </>
    )
}

function SidebarList({ sku, contentMap }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between cursor-pointer h-8">
                <span className="pl-1 text-[11px] font-semibold uppercase text-[#e2e2ee]">
                    {contentMap.label}
                </span>
                <ChevronRightIcon
                    className={`text-[1.625em] text-[#5c5b60] opacity-60

                     transition-all linear duration-200`}
                />
            </div>
            <ul
                className={`flex flex-col gap-1 my-1 text-sm transition-all linear duration-300 overflow-hidden `}
            >
                {contentMap.content.map((item) => {
                    if (item.type === "dir") {
                        return (
                            <SidebarList
                                sku={sku}
                                contentMap={item}
                                key={item.name}
                            />
                        )
                    } else {
                        return (
                            <SidebarListItem
                                sku={sku}
                                name={item.name}
                                path={item.path}
                                label={item.label}
                                key={item.name}
                            />
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export function ToggleSidebarButton() {
    return (
        <div className="border border-[#232326] hover:bg-[#1e2023] hover:border-[#29292c]cursor-pointer rounded-lg flex items-center justify-center h-9 w-10 z-10">
            <Image
                src="/docs3/images/sidebar.svg"
                alt="Hide Sidebar"
                width={16}
                height={20}
                className="opacity-60 h-6 w-4"
                unoptimized
            />
        </div>
    )
}

export default function Sidebar() {
    return (
        <aside
            id="sidebar"
            className="fixed overflow-scroll left-0 border-r transition-all px-5 pt-3 w-72"
        >
            <div className="flex flex-col justify-center text-sm text-[#e3e2ee90] pt-3">
                <ul>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                </ul>
            </div>
        </aside>
    )
}
