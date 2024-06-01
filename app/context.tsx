"use client"

import React, { createContext, useState, useEffect } from "react"
import { LayoutProps, MessageType, MessagesContextI } from "./lib/types"

const contextInit: MessagesContextI = {
    messagesContext: [
        {
            role: "system",
            content: ""
        }
    ],
    sendMessage: () => {}
}

export const MessagesContext = createContext(contextInit)

export const MessagesProvider = ({ children }: LayoutProps) => {
    const [messages, setMessages] = useState(contextInit.messagesContext)
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8000/ws")

        newSocket.onopen = () => {
            console.log("WebSocket connection opened.")
            setSocket(newSocket)
        }

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.content && data.role) {
                setMessages((prev) => [
                    ...prev,
                    { role: data.role, content: data.content }
                ])
            }
        }

        newSocket.onclose = () => {
            console.log("WebSocket connection closed.")
            setSocket(null)
        }

        return () => {
            newSocket.close()
        }
    }, [])

    const sendMessage = (input: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            if (input) {
                const message: MessageType = { role: "user", content: input }
                socket.send(JSON.stringify(message))
                setMessages((prev) => [...prev, message])
            } else {
                console.log("No message to send.")
            }
        } else {
            console.log("WebSocket connection is not available.")
        }
    }

    return (
        <MessagesContext.Provider
            value={{ messagesContext: messages, sendMessage }}
        >
            {children}
        </MessagesContext.Provider>
    )
}
