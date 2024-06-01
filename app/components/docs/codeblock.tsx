"use client"

import React from "react"
import { CommandBlockProps } from "@/app/lib/types"
import { Noto_Sans_Mono } from "next/font/google"

const notoMono = Noto_Sans_Mono({ subsets: ["latin"] })
const useState = React.useState
const useEffect = React.useEffect

export function CodeBlock({ children }: { children: string }) {
    return (
        <pre className={`${notoMono.className}`}>
            <code>{children}</code>
        </pre>
    )
}

export function CommandBlock({ command, output }: CommandBlockProps) {
    const [currentOutput, setCurrentOutput] = useState([command])
    const [running, setRunning] = useState(false)
    const [finished, setFinished] = useState(false)

    function formatDate(date: Date): string {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]
        const dayOfWeek = days[date.getDay()]
        const month = months[date.getMonth()]
        const day = date.getDate().toString().padStart(2, "0")
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        const seconds = date.getSeconds().toString().padStart(2, "0")
        const year = date.getFullYear()
        return `[${dayOfWeek} ${month} ${day} ${hours}:${minutes}:${seconds} ${year}]`
    }

    function replaceDatesWithCurrent(line: string): string {
        return line.replace(/\[.*?\]/, formatDate(new Date()))
    }

    function runCommand() {
        setRunning(true)

        const outputLines = output
            .split("\n")
            .filter((line) => line.trim() !== "")

        setCurrentOutput([])

        outputLines.forEach((line, index) => {
            setTimeout(() => {
                setCurrentOutput((prev) => [
                    ...prev,
                    replaceDatesWithCurrent(line)
                ])
                if (index === outputLines.length - 1) {
                    setRunning(false)
                    setFinished(true)
                }
            }, index * 10)
        })
    }

    function reset() {
        setCurrentOutput([command])
        setRunning(false)
        setFinished(false)
    }

    useEffect(() => {
        if (running) {
            setCurrentOutput([])
        }
    }, [running])

    return (
        <div>
            <pre>
                <code className="relative">
                    {currentOutput.join("\n")}
                    {!running && (
                        <button
                            className="absolute bottom-0 right-0 text-[#89b73f] font-mono uppercase font-semibold flex w-full justify-end"
                            onClick={finished ? reset : runCommand}
                        >
                            {finished ? `Clear` : `Run`}
                        </button>
                    )}
                </code>
            </pre>
        </div>
    )
}
