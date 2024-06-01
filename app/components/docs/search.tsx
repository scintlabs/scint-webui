"use client"

import { useGlobalContext } from "@/app/context"
import Image from "next/image"
import { useEffect } from "react"

export const SearchIcon = () => {
    return (
        <Image
            src="/docs3/images/search.svg"
            alt="Search"
            width={18}
            height={18}
            unoptimized
            className="text-[#89b73f]"
        />
    )
}

function PreviewPanel() {
    return <div className="border border-[#262728] h-9 w-48 rounded-lg"></div>
}

function ChatPanel() {
    return <div className="border border-[#262728] h-9 w-48 rounded-lg"></div>
}

function SearchInput() {
    return (
        <div className="w-full border-b border-[#2e2e30] h-14">
            <input
                placeholder="Search ..."
                className="h-14 pl-4 bg-transparent outline-none placeholder:opacity-30"
            ></input>
        </div>
    )
}

export default function SearchPanel() {
    const { toggleSearchPanel, searchPanel: searchPanelActive } =
        useGlobalContext()

    useEffect(() => {
        const handleSearchKey = (event: KeyboardEvent) => {
            if (event.key === "/" && searchPanelActive) {
                toggleSearchPanel()
            }
        }

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && searchPanelActive) {
                toggleSearchPanel()
            }
        }

        document.addEventListener("keydown", handleSearchKey)
        document.addEventListener("keydown", handleEscKey)

        return () => {
            document.removeEventListener("keydown", handleSearchKey)
            document.removeEventListener("keydown", handleEscKey)
        }
    }, [searchPanelActive, toggleSearchPanel])

    return (
        <>
            {searchPanelActive && (
                <div className="absolute top-0 left-0 z-50 overflow-hidden overscroll-none w-full h-full bg-[#15151780]">
                    <div
                        id="search"
                        className="fixed -mt-14 w-[800px] h-[560px] bg-[#1e1e1f] border border-[#303032] rounded-xl shadow-3xl shadow-black z-50"
                    >
                        <SearchInput />
                    </div>
                </div>
            )}
        </>
    )
}
