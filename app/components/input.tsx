"use client"

import React, { useContext, useState, useEffect, useRef } from "react"
import { MessagesContext } from "../context"

export function InputBar() {
    const { sendMessage } = useContext(MessagesContext)
    const [inputHeight, setInputHeight] = useState(50)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleInputChange = () => {
        if (inputRef.current) {
            const newHeight = Math.max(inputRef.current.scrollHeight, 50)
            inputRef.current.style.height = `${newHeight}px`
            setInputHeight(newHeight)
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = `${50}px`
            setInputHeight(50)
        }
    }, [setInputHeight, inputRef])

    return (
        <section className="sticky top-full mb-5 max-h-96 max-w-screen-md px-10 w-full mx-auto">
            <textarea
                ref={inputRef}
                className="w-full py-[0.925rem] pl-3.5 caret-[#b6b5bf] rounded-2xl backdrop-blur-md text-[#e3e2ed] border-[#515152] border-[0.5px] shadow-lg shadow-black/15 outline-none ring-0 font-light resize-none bg-[#1e1e1ec0] focus:bg-[#171717c0] focus:border-[#353537] transition-colors focus:border"
                style={{ height: `${inputHeight}px` }}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        e.currentTarget.value.trim()
                    ) {
                        sendMessage(e.currentTarget.value)
                        e.preventDefault()
                        e.currentTarget.value = ""
                        if (inputRef.current) {
                            inputRef.current.style.height = "50px"
                            setInputHeight(50)
                        }
                    }
                }}
                onChange={handleInputChange}
            />
        </section>
    )
}

export default InputBar
