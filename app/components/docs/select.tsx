import React, { useRef, useState, useEffect, ReactNode } from "react"

interface DropdownProps {
    children: ReactNode
    selectedLabel?: string
    onClose?: () => void
}

interface DropdownItemElement extends React.HTMLAttributes<HTMLDivElement> {
    onClick?: () => void
}

export function Dropdown({ children, selectedLabel }: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscKey)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscKey)
        }
    }, [])

    const handleDropdownItemClick = () => {
        setIsOpen(false)
    }

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement<DropdownItemElement>(child)) {
                return React.cloneElement<DropdownItemElement>(child, {
                    onClick: handleDropdownItemClick
                })
            }
            return child
        })
    }

    return (
        <div
            ref={dropdownRef}
            className="h-full flex justify-center items-center"
        >
            <div
                className="h-full flex justify-center items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedLabel}
            </div>
            {isOpen && renderChildren()}
        </div>
    )
}

export interface DropdownItemProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

export function DropdownItem({
    children,
    onClick,
    className
}: DropdownItemProps) {
    return (
        <div onClick={onClick} className={`${className}`}>
            {children}
        </div>
    )
}
