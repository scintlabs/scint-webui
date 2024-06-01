import React, { ReactNode } from "react"
import { BlockProps, Product } from "@/app/lib/types"

const matchSku = (skuFilter: string, productSku: string): boolean => {
    if (skuFilter === "!xxxx") return false
    let regexPattern = skuFilter.replace(/x/g, ".").replace(/!/g, "^")

    if (skuFilter.startsWith("!")) {
        return !new RegExp(regexPattern.substring(1)).test(productSku)
    } else {
        return new RegExp(regexPattern).test(productSku)
    }
}

export function BySku({ skuFilter, product, children }: BlockProps) {
    if (matchSku(skuFilter, product.skuComposite)) {
        return <>{children}</>
    }

    return null
}
