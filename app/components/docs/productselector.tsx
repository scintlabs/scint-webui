"use client"

import * as React from "react"
import { useGlobalContext } from "@/app/context"
import { usePathname } from "next/navigation"
import { DropdownItem, Dropdown } from "@/app/theme/docs/select"
import { sortFamily } from "@/app/lib/data"

export function ProductSelector() {
    const pathname = usePathname()
    const { products, selectedSku, selectSku } = useGlobalContext()
    const [selectedLabel, setSelectedLabel] = React.useState("Select Product")

    React.useEffect(() => {
        const skuFromPath = pathname.split("/")[1]
        if (skuFromPath) {
            setSelectedLabel(`FMADIO-${skuFromPath}`)
        } else {
            setSelectedLabel("Select Product")
        }
    }, [pathname])

    const listContent = Object.entries(products)
        .sort(sortFamily)
        .map(([family, skus]) => (
            <div key={family} className="flex flex-col gap-y-1">
                <div className="text-[0.725rem] px-3.5 py-2 uppercase text-[#e3e2ee40] font-bold bg-none w-full">
                    {family}
                </div>
                {skus.map((sku) => (
                    <DropdownItem
                        key={sku}
                        onClick={() => selectSku(sku)}
                        className="cursor-pointer py-1 px-2.5 mx-1.5 rounded-md text-[#e3e2eea0] hover:text-[#e3e2ee] text-[0.825rem] hover:bg-[#e3e2ee10]"
                    >
                        {`FMADIO-${sku}`}
                    </DropdownItem>
                ))}
            </div>
        ))

    return (
        <div className="flex flex-col w-44">
            <span className="flex flex-row text-[0.825rem] font-light text-[#7d7d7e]">
                Product
            </span>
            <div className="relative w-full h-full flex flex-row items-center rounded-b-none rounded-t-lg border-b-0 text-[0.825em] font-medium text-[#89b73f] cursor-pointer">
                <Dropdown selectedLabel={selectedLabel}>
                    <div className="top-full mt-2 absolute w-56 z-50 shadow-lg shadow-black/20 border-[#3d3d3e80] bg-[#1e1e1f] backdrop-blur-sm border rounded-lg min-w-max">
                        {listContent}
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}
