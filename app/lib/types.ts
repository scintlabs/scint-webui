import { ReactNode } from "react"
import { ResolvingMetadata, Metadata } from "next"

export type { RouteParams } from "./routes"
export type { InferGetStaticPropsType as InferType } from "next"
export type Meta = Metadata
export type ResMeta = ResolvingMetadata

export type ProviderProps = {
    children: ReactNode
}

export type ContentProviderProps = {
    children: ReactNode
}

export interface PageLink {
    category: string
    document: string
}

export interface LayoutProps {
    children: React.ReactNode
}

export interface ProductSelectorProps {
    class?: string
    itemClass?: string
    groupClass?: string
}

export interface ContentMap {
    name: string
    label: string
    position: number
    type: string
    content: Array<FileJson | ContentMap>
    path: string[]
}

export interface DirectoryMeta {
    position: number
    label: string
}

export interface FileMeta {
    label: string
    position: number
}

export interface FileJson {
    name: string
    label: string
    position: number
    type: string
    content: Array<any>
    path: string[]
}

export interface ProductSelectorProps {
    className?: string
    itemClassName?: string
    groupClassName?: string
}

export interface ProductCaptureInterface {
    interface: string
    capacity: number
    modes: {
        [key: string]: {
            physical_ports: number[]
            logical_ports: number[]
            fec: boolean
            port_map: {
                [key: string]: string[]
            }
        }
    }
}

export interface ProductManagementInterface {
    interface: string
    modes: {
        [key: string]: {
            physical_ports: number[]
            logical_ports: number[]
            fec: boolean
            port_map: {
                [key: string]: string[]
            }
        }
    }
}

export interface ProductPorts {
    [key: string]: {
        type: string
        port_numbers: number[]
    }
}

export interface ProductSpecifications {
    capture: ProductCaptureInterface
    management: any
    ports: ProductPorts
    storage: {
        drive_capacity: number
        storage_capacity: string[]
        storage_interface: string
        encryption: string
        nvme: string
        redundancy: string
        endurance_1y: string
        endurance_5y: string
        retention: string
    }
    system: {
        processor: string
        processor_cores: number
        memory: string
        memory_capacity: number
    }
    power: {
        input: string
        output: string
        quantity: number
        model: string
    }
    dimensions: {
        width: number
        height: number
        depth: number
        weight: number
    }
    environment: {
        temp_operating: string
        temp_nonoperating: string
        humidity_operating: string
        humidity_nonoperating: string
        vibration: string
        altitude_operation: string
        thermal_extended: boolean
    }
}

export interface ProductFeatures {
    flow_monitoring: boolean
    integrations: boolean
    diy_containers: boolean
    microburst_monitoring: boolean
    layer_one_capture: boolean
    telemetry: boolean
    pcap_push_intra: boolean
    pcap_push_eod: boolean
    fpga_filtering: boolean
}

export interface ProductApps {
    finance: {
        gap_detect: boolean
    }
    security: {
        ids_suricata: boolean
        dns_decode: boolean
    }
    telecom: {
        voip: boolean
        gtpc_gtpu: boolean
    }
}

export interface Product {
    sku: string
    family: string
    features: ProductFeatures
    apps: ProductApps
    specifications: ProductSpecifications
}

export interface GlossaryDefinition {
    description: string
    reference_links: string[]
}

export type Glossary = {
    [entry: string]: GlossaryDefinition
}

export type Content = {
    glossary: Glossary
}

export type GlobalContext = {
    products: { [sku: string]: string[] }
    selectedSku: string
    searchPanelActive: boolean
    sidebarHidden: boolean
    metabarHidden: boolean
    sidebarStates: Record<string, boolean>
    selectSku: (sku: string) => void
    toggleSidebar: () => void
    toggleSidebarCategory: (id: string) => void
    toggleMetabar: () => void
    toggleSearchPanel: () => void
}

export interface ProductData {
    family: string
    io: string
    form_factor: string
    generation: string
    specifications: {
        storage: {
            drive_capacity: number
            storage_capacity: string[]
            retention: string
        }
        system: {
            processor: string
            processor_cores: number
            memory: string
            memory_capacity: number
        }
        power: {
            input: string
            output: string
            quantity: number
            model: string
        }
        dimensions: {
            width: number
            height: number
            depth: number
            weight: number
        }
        environment: {
            temp_operating: string
            temp_nonoperating: string
            humidity_operating: string
            humidity_nonoperating: string
            vibration: string
            altitude_operation: string
            thermal_extended: boolean
        }
    }
}

export interface FamilyData {
    features: {
        flow_monitoring: boolean
        integrations: boolean
        diy_containers: boolean
        microburst_monitoring: boolean
        layer_one_capture: boolean
        telemetry: boolean
        pcap_push_intra: boolean
        pcap_push_eod: boolean
        fpga_filtering: boolean
    }
    apps: {
        finance: {
            gap_detect: boolean
        }
        security: {
            ids_suricata: boolean
            dns_decode: boolean
        }
        telecom: {
            voip: boolean
            gtpc_gtpu: boolean
        }
    }
}

export interface IOData {
    capacity: number
    interface: string
    modes: string[]
}

export interface CaptureData {
    physical_ports: number[]
    logical_ports: number[]
    fec: boolean
    port_map: {
        [key: string]: string[]
    }
}

export interface CaptureDataMap {
    [key: string]: CaptureData
}

export interface MessageType {
    role: string
    content: string
}

export interface MessagesContextI {
    messagesContext: MessageType[]
    sendMessage: (input: string) => void
}

export interface MessagesProviderProps {
    children: ReactNode
}
