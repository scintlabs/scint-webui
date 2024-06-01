import React from "react"
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google"
import { MessagesProvider } from "./context"
import "./base.css"

const notoSans = Noto_Sans({ subsets: ["latin"] })
const notoMono = Noto_Sans_Mono({ subsets: ["latin"] })

export const metadata = {
    title: "Scint",
    description: "Scint"
}

export default function RootLayout({ children }) {
    return (
        <html
            className={`${notoSans.className} bg-[#171717] text-[#e3e2ed] font-sans`}
            lang="en"
        >
            <body className="max-h-screen max-w-screen w-full h-full min-h-screen min-w-screen">
                <MessagesProvider>{children}</MessagesProvider>
            </body>
        </html>
    )
}
