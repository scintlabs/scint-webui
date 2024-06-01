"use client"

import React, { useEffect } from "react"

export interface LinkableTableProps {
    props: {
        id: string
        showNumberedIndex?: boolean
        headings: string[]
        data: Record<string, string>[]
    }
}

function LinkableTable({ props }: LinkableTableProps) {
    function highlightRow(hash: string) {
        document.querySelectorAll(".highlighted").forEach((el) => {
            el.classList.remove("highlighted")
        })
        const rowToHighlight = document.querySelector(`[data-hash="${hash}"]`)
        if (rowToHighlight) {
            rowToHighlight.classList.add("highlighted")
        }
    }

    function handleRowClick(hash: string, event: React.MouseEvent) {
        event.preventDefault()
        history.pushState("", `#${hash}`)
        highlightRow(hash)
    }

    useEffect(() => {
        const hash = window.location.hash.replace("#", "")
        if (hash) highlightRow(hash)

        const handleHashChange = () => {
            const newHash = window.location.hash.replace("#", "")
            if (newHash) highlightRow(newHash)
        }

        window.addEventListener("hashchange", handleHashChange)
        return () => window.removeEventListener("hashchange", handleHashChange)
    }, [props.id])

    return (
        <table className="linkable-table" id={props.id}>
            <tbody>
                {props.data.map((row, index) => {
                    const rowIndex = index + 1
                    const hash = row.tableIndex
                        ? `${row.tableIndex}-${rowIndex}`
                        : rowIndex.toString()
                    return (
                        <tr data-hash={hash} key={index}>
                            {props.showNumberedIndex && <td>{rowIndex}</td>}
                            {Object.keys(row).map((key, cellIndex) => (
                                <td key={cellIndex}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleRowClick(hash, e)}
                                    >
                                        {key === "portType" ? (
                                            <strong>{row[key]}</strong>
                                        ) : (
                                            <strong>{row[key]}</strong>
                                        )}
                                    </a>
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default LinkableTable
