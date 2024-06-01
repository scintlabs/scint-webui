"use client"

import { usePathname } from "next/navigation"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined"
import Link from "next/link"
import React from "react"

export default function Breadcrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").slice(2)
    const fileName = pathSegments[pathSegments.length - 1]

    return (
        <ul
            id="breadcrumbs"
            className="h-16 mt-4 items-center flex flex-row text-[#7c7c7d]"
        >
            <li className="flex flex-row items-center justify-center font-medium">
                <Link
                    href="/docs/"
                    className="hover:text-[#89b73f] flex items-center"
                >
                    <LibraryBooksIcon style={{ fontSize: "1.25em" }} />
                </Link>
                <ArrowForwardIosOutlinedIcon
                    style={{ fontSize: "0.725em" }}
                    className="mx-4 text-[#e3e2ee50]"
                />
            </li>

            {pathSegments.slice(0, -1).map((segment, index, arr) => {
                const pathToSegment = `docs/${pathSegments[0]}/${arr
                    .slice(0, index + 1)
                    .join("/")}/`
                return (
                    <React.Fragment key={index}>
                        <li className="h-9 flex flex-row items-center capitalize">
                            <Link
                                href={pathToSegment}
                                className="h-9 flex flex-row items-center hover:text-[#89b73f]"
                            >
                                <FolderOutlinedIcon
                                    style={{ fontSize: "1.25em" }}
                                    className="mr-2"
                                />
                                <span>{segment.replaceAll("-", " ")}</span>
                            </Link>
                            <ArrowForwardIosOutlinedIcon
                                style={{ fontSize: "0.725em" }}
                                className="mx-4 text-[#7c7c7d]"
                            />
                        </li>
                    </React.Fragment>
                )
            })}

            <li className="flex h-9 flex-row items-center justify-center text-[#e3e2eeb0] capitalize">
                <span className="h-9 flex flex-row items-center">
                    <DescriptionOutlinedIcon
                        style={{ fontSize: "0.9rem" }}
                        className="mr-2"
                    />
                    <span>{fileName.replaceAll("-", " ")}</span>
                </span>
            </li>
        </ul>
    )
}
