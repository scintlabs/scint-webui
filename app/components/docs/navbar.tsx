"use client"

import { useEffect } from "react"
import { ToggleSidebarButton } from "../sidebar"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav
            id="navbar"
            className="fixed top-0 z-10 min-h-14 px-7 w-full flex flex-row items-center justify-between border-b mx-auto"
        >
            <div className="flex flex-row justify-start w-1/3 gap-4">
                <ToggleSidebarButton />
            </div>
            <div className="flex justify-center items-center w-2/3">
                <Link href="/">
                    <Image
                        alt="FMADIO Logo"
                        src="/docs3/images/logo.png"
                        width={100}
                        height={100}
                        className="h-auto w-32 opacity-80"
                    />
                </Link>
            </div>
            <div className="flex justify-end w-1/3 gap-4"></div>
        </nav>
    )
}
