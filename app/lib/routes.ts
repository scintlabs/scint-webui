import { getProductSkus } from "@/app/lib/data"
import fs from "fs"
import path from "path"

export type RouteParams = {
    path: string[]
}

export interface Content {
    name: string
    path: string
    route: string
}

export interface Configuration {
    content: Content[]
}

export function loadContentList(
    dataPath: string,
    basePath: string | null = null
): string[] {
    if (basePath === null) {
        basePath = dataPath
    }

    const stats = fs.lstatSync(dataPath)
    let list: string[] = []

    if (stats.isDirectory()) {
        const children = fs.readdirSync(dataPath)
        children.forEach((child) => {
            list = list.concat(
                loadContentList(path.join(dataPath, child), basePath)
            )
        })
    } else if (
        stats.isFile() &&
        (dataPath.endsWith(".md") || dataPath.endsWith(".mdx"))
    ) {
        const baseWithSep = basePath.endsWith(path.sep)
            ? basePath
            : `${basePath}${path.sep}`
        const relativePath = dataPath.replace(baseWithSep, "")
        list.push(relativePath)
    }
    return list
}

function generateRouteMap(paths: string[], skus: string[]): RouteParams[] {
    let routeMap: RouteParams[] = []
    skus.forEach((sku) => {
        paths.forEach((path) => {
            const combinedPath = `${sku}/${path}`
            const finalPath: string[] = combinedPath.slice(0, -4).split("/")
            const routeParams: RouteParams = {
                path: finalPath
            }

            routeMap.push(routeParams)
        })
    })
    return routeMap
}

const configuration: Configuration = {
    content: [
        {
            name: "docs",
            path: "content/docs",
            route: "/[sku]/"
        },
        {
            name: "guides",
            path: "content/guides",
            route: "/guides/"
        },
        {
            name: "tools",
            path: "content/tools",
            route: "/tools/"
        }
    ]
}

export async function getConfiguration(
    configuration: Configuration
): Promise<any> {
    let results = {}
    for (const contentConfig of configuration.content) {
        const skuList: string[] = getProductSkus()
        const contentList = loadContentList(contentConfig.path)
        const routeMap = generateRouteMap(contentList, skuList)
        return {
            contentList,
            routeMap
        }
    }
}

export async function getContentList() {
    const content = await getConfiguration(configuration)
    return content.contentList
}

export async function getRouteMap(): Promise<any> {
    const content = await getConfiguration(configuration)
    return content.routeMap
}
