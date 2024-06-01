"use client"

import React, { useContext } from "react"
import { MessagesContext } from "../context"
import { RenderMarkdown } from "./content"

export const Messages = () => {
    const { messagesContext } = useContext(MessagesContext)
    const messages = messagesContext

    return (
        <section className="flex flex-col flex-grow h-full w-full p-6 items-center">
            <div className="flex flex-col flex-grow h-full w-full">
                <ul className="flex flex-col flex-grow max-w-screen-md px-6 h-full w-full">
                    {messages.map((msg, index) => (
                        <li
                            key={index}
                            className={`flex flex-row w-full justify-center items-center ${msg.role} mb-4`}
                        >
                            <div className="rounded-full bg-[#222225] min-w-8 min-h-8 max-h-8 max-w-8 -ml-12 absolute"></div>
                            <RenderMarkdown content={msg.content} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Messages
