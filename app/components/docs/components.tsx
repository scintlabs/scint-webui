import { BySku } from "@/app/theme/docs/contentblock"
import { CommandBlock } from "@/app/theme/docs/codeblock"
import { DocHeading, TocHeading } from "@/app/theme/docs/heading"
import Image from "next/image"
import Callout from "@/app/theme/common/callouts"
import LinkableTable from "./linkabletable"
import type {
    Product,
    TocHeadingProps,
    CalloutProps,
    BlockProps,
    CommandBlockProps
} from "@/app/lib/types"

export function ProductName({ product }: { product: Product }) {
    return <span>FMADIO-{product.skuComposite}</span>
}

export function CapturePorts({ product }: { product: Product }) {
    return <>{product.specifications.capture[0].interface}</>
}

export function PortLayoutImage({ product }: { product: Product }) {
    const skuNumber = product.sku.slice(0, 4)
    return (
        <Image
            src={`/docs3/images/products/${skuNumber}-port-layout.png`}
            width={100}
            height={100}
            alt={`FMADIO-${product.skuComposite} Port Layout`}
            className="w-full max-w-11/12 h-auto mb-10"
        />
    )
}

export function ManagementPorts({ product }: { product: Product }) {
    const managementPorts = product.specifications.ports
        .filter((port) => port.type === "management")
        .map((port, index) => (
            <span key={index}>
                {port.configs.map((config) => config.config)} management port
            </span>
        ))

    const managementPortsDescription = managementPorts.reduce(
        (
            acc: any,
            port: { props: { children: any } },
            index: number,
            array: string | any[]
        ) => {
            const separator = index < array.length - 1 ? ", " : ""
            return `${acc}${port.props.children}${separator}`
        },
        ""
    )

    return (
        <>
            <div>{managementPortsDescription}</div>
            {managementPorts.length > 0 && (
                <div>Configurations: {managementPorts}</div>
            )}
        </>
    )
}

export function AdditionalPorts({ product }: { product: Product }) {
    const additionalPorts = product.specifications.ports
        .filter((port) => port.type !== "management")
        .map((port) => (
            <div key={port.type}>
                <span>{port.type}: </span>
                <span>
                    {port.configs
                        .flatMap((config) => config.physical_ports)
                        .map((portNumber) => `phy${portNumber}`)
                        .join(", ")}
                </span>
            </div>
        ))

    return <>{additionalPorts}</>
}

export function NetworkSpec({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                <tr>
                    <td className="max-w-20 min-w-20">
                        <strong>Module Support</strong>
                    </td>
                    <td>
                        LR4 (Long Range 4) single-mode fiber optic module for up
                        to 10 kilometers
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        SR4 (Short Range 4) multi-mode fiber optic module for
                        short-range data communication
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        CX4 (10 Gigabit Copper X) for high-speed transfers up to
                        15 meters
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        Optional FEC (Forward Error Correction) for enhanced
                        data transmission integrity
                    </td>
                </tr>
                <tr>
                    <td className="max-w-20 min-w-20">
                        <strong>Throughput</strong>
                    </td>
                    <td>
                        {product.specifications.capture[0].capacity}Gbps
                        sustained line rate packet capture to disk
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        297.76Mpps sustained line rate packet capture to disk
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>Packet sizes from 64 - 9200 bytes</td>
                </tr>
                <tr>
                    <td className="max-w-20 min-w-20">
                        <strong>FPGA Filtering</strong>
                    </td>
                    <td>Pre-capture filtering</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Packet Slicing for packet truncation</td>
                </tr>
                <tr>
                    <td>
                        <strong>Clock Syncronization</strong>
                    </td>
                    <td>PTPv2</td>
                </tr>
                <tr>
                    <td></td>
                    <td>NTP</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Precision hardware-based timestamping</td>
                </tr>
                <tr>
                    <td></td>
                    <td>332mhz 3.01 nsec resolution</td>
                </tr>
            </tbody>
        </table>
    )
}

export function CaptureSpec({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                {product.specifications.capture.map((port, portIndex) =>
                    port.configs.map((config, configIndex) => {
                        return (
                            <tr key={`port-${portIndex}-config-${configIndex}`}>
                                <td className="max-w-20 min-w-20">
                                    {configIndex === 0 && (
                                        <strong>Configurations</strong>
                                    )}
                                </td>
                                <td>
                                    {config.config.slice(0, 2)} {port.interface}{" "}
                                    {config.config.slice(2)} GbE{" "}
                                    {config.fec ? "(Optional FEC)" : ""}
                                </td>
                            </tr>
                        )
                    })
                )}
            </tbody>
        </table>
    )
}

export function StorageSpec({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <strong>Drive Capacity</strong>
                    </td>
                    <td>{product.specifications.storage.drive_capacity}</td>
                </tr>
                {product.specifications.storage.storage_capacity.map(
                    (capacity, capacityIndex) => (
                        <tr key="storageCapacity">
                            <td
                                key="capacityIndex"
                                className="max-w-20 min-w-20"
                            >
                                {capacityIndex === 0 && (
                                    <strong>Storage Capacities</strong>
                                )}
                            </td>
                            <td key={capacity}>{capacity.slice(0, -1)} TB</td>
                        </tr>
                    )
                )}
                <tr>
                    <td>
                        <strong>Redundancy</strong>
                    </td>
                    <td key="redundancy">
                        {product.specifications.storage.redundancy}
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Interface</strong>
                    </td>
                    <td key="interface">
                        {product.specifications.storage.interface}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td key="encryption">
                        {product.specifications.storage.encryption}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td key="nvme">{product.specifications.storage.nvme}</td>
                </tr>
            </tbody>
        </table>
    )
}

export function ManagementSpec({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                {product.specifications.ports
                    .filter((port) => port.type === "management")
                    .map((port, portIndex) =>
                        port.configs.map((config, configIndex) => {
                            return (
                                <tr
                                    key={`port-${portIndex}-config-${configIndex}`}
                                >
                                    <td className="max-w-20 min-w-20">
                                        <strong>Configurations</strong>
                                    </td>
                                    <td>
                                        {config.config.slice(0, 2)}{" "}
                                        {port.interface}{" "}
                                        {config.config.slice(2)} GbE{" "}
                                        {config.fec ? "(Optional FEC)" : ""}
                                    </td>
                                </tr>
                            )
                        })
                    )}
            </tbody>
        </table>
    )
}

export function SystemSpec({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                <tr key="processors">
                    <td className="max-w-20 min-w-20">
                        <strong>Processor</strong>
                    </td>
                    <td>{product.specifications.system.processor}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {product.specifications.system.processor_cores} Cores
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {product.specifications.system.processor_cores * 2}{" "}
                        Threads
                    </td>
                </tr>
                <tr key="memory">
                    <td className="max-w-20 min-w-20">
                        <strong>Memory</strong>
                    </td>
                    <td>
                        {`${product.specifications.system.memory_capacity}GB ${product.specifications.system.memory}`}
                    </td>
                </tr>
                <tr key="psu">
                    <td key="key">
                        <strong>Power</strong>
                    </td>
                    <td key="key">
                        {product.specifications.power.quantity}x{" "}
                        {product.specifications.power.model}W power supplies
                    </td>
                </tr>
                <tr key="output">
                    <td></td>
                    <td key="power-output">
                        {product.specifications.power.output} output
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td key="power-input">
                        {product.specifications.power.input} input
                    </td>
                </tr>
                <tr key="cooling">
                    <td key="key">
                        <strong>Cooling</strong>
                    </td>
                    <td key="key">12 x 40mm fans, hot-swappable fans</td>
                </tr>
            </tbody>
        </table>
    )
}

export function PhysicalSpec({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <strong>Dimensions</strong>
                    </td>
                    <td key="form-factor">
                        {product.sku.slice(2, 3)}U Form Factor
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td key="dimensions">
                        {product.specifications.dimensions.width}mm x{" "}
                        {product.specifications.dimensions.depth}mm x{" "}
                        {product.specifications.dimensions.height}mm
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Weight</strong>
                    </td>
                    <td key="weight">
                        {product.specifications.dimensions.weight} kg
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Temperature</strong>
                    </td>
                    <td key="temp">
                        {product.specifications.environment.temp_operating}{" "}
                        operating
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td key="temp-non">
                        {product.specifications.environment.temp_nonoperating}{" "}
                        non-operating
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Humidity</strong>
                    </td>
                    <td key="humidity">
                        {product.specifications.environment.humidity_operating}{" "}
                        operating
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td key="humidity-non">
                        {
                            product.specifications.environment
                                .humidity_nonoperating
                        }{" "}
                        non-operating
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Thermal</strong>
                    </td>
                    <td key="thermal">
                        {product.specifications.environment.thermal_extended}
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Altitude</strong>
                    </td>
                    <td key="altitude">
                        {product.specifications.environment.altitude_operation}
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Vibration</strong>
                    </td>
                    <td key="vibration">
                        {product.specifications.environment.vibration}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export function PortLayoutTable({ product }: { product: Product }) {
    const generateData = (): Record<string, string>[] => {
        const capturePorts = product.specifications.capture.flatMap(
            (port, portIndex) => {
                return [
                    {
                        portLabel: portIndex === 0 ? "Capture Ports" : "",
                        port: `${port.capacity}GbE ${port.interface}`,
                        interface: "cap0"
                    },
                    {
                        portLabel: "",
                        port: `${port.capacity}GbE ${port.interface}`,
                        interface: "cap1"
                    }
                ]
            }
        )

        const managementPorts = product.specifications.ports
            .filter((port) => port.category === "management")
            .flatMap((port, portIndex) => {
                return [
                    {
                        portLabel: portIndex === 0 ? "Management Ports" : "",
                        port: `${port.capacity}GbE ${port.interface}`,
                        interface: "man10"
                    },
                    {
                        portLabel: "",
                        port: `${port.capacity}GbE ${port.interface}`,
                        interface: "man11"
                    }
                ]
            })

        const managementPortsExtra = product.specifications.ports
            .filter((port) => port.category === "management_extra")
            .flatMap((port, portIndex) =>
                port.configs.map((config) => ({
                    portLabel: "",
                    port: `${port.capacity}GbE ${port.type}`,
                    interface: `${config.port_map.flat()[0]}`
                }))
            )

        const additionalPorts = product.specifications.ports
            .filter((port) => port.category === "additional")
            .flatMap((port, portIndex) => {
                return {
                    portLabel: portIndex === 0 ? "Additional Ports" : "",
                    port: `${port.interface}`,
                    interface: ""
                }
            })

        const powerSupplies = Array(product.specifications.power.quantity)
            .fill(null)
            .map((_, index) => ({
                portLabel: index === 0 ? "Power Supplies" : "",
                port: `${product.specifications.power.model}W`,
                interface: ""
            }))

        return [
            ...capturePorts,
            ...managementPorts,
            ...managementPortsExtra,
            ...additionalPorts,
            ...powerSupplies
        ]
    }

    const props = {
        id: "port-layout-table",
        showNumberedIndex: true,
        headings: [],
        data: generateData()
    }

    return <LinkableTable props={props} />
}

export function CapturePortLayout({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                {product.specifications.capture.map((port, portIndex) =>
                    port.configs.map((config, configIndex) => {
                        return (
                            <tr key={portIndex}>
                                <td>
                                    <strong>{config.config}GbE</strong>
                                </td>
                                <td>
                                    {config.physical_ports
                                        .map((port) => `cap${port}`)
                                        .join(", ")}
                                </td>
                                <td>
                                    {config.logical_ports
                                        .map((port) => `cap${port}`)
                                        .join(", ")}
                                </td>
                            </tr>
                        )
                    })
                )}
            </tbody>
        </table>
    )
}

export function ManagementPortLayout({ product }: { product: Product }) {
    return (
        <table>
            <tbody>
                {product.specifications.ports
                    .filter((port) => port.category === "management")
                    .map((port, portIndex) =>
                        port.configs.map((config, configIndex) => {
                            return (
                                <tr key={portIndex}>
                                    <td>
                                        <strong>{config.config}GbE</strong>
                                    </td>
                                    <td>
                                        {config.physical_ports
                                            .map((port) => `man${port}`)
                                            .join(", ")}
                                    </td>
                                    <td>
                                        {config.logical_ports
                                            .map((port) => `man${port}`)
                                            .join(", ")}
                                    </td>
                                </tr>
                            )
                        })
                    )}
            </tbody>
        </table>
    )
}

export function DocComponents(product: Product) {
    return {
        h1: DocHeading("h1"),
        h2: DocHeading("h2"),
        h3: DocHeading("h3"),
        h4: DocHeading("h4"),
        h5: DocHeading("h5"),
        h6: DocHeading("h6"),
        ContentBlock: (props: BlockProps) => (
            <BySku {...props} product={product} />
        ),
        CommandBlock: (props: CommandBlockProps) => <CommandBlock {...props} />,
        Callout: (props: CalloutProps) => <Callout {...props} />,
        ProductName: () => <ProductName product={product} />,
        NetworkSpec: () => <NetworkSpec product={product} />,
        StorageSpec: () => <StorageSpec product={product} />,
        CaptureSpec: () => <CaptureSpec product={product} />,
        ManagementSpec: () => <ManagementSpec product={product} />,
        SystemSpecification: () => <SystemSpec product={product} />,
        PhysicalSpec: () => <PhysicalSpec product={product} />,
        ModifiedLinkableTable: () => <PortLayoutTable product={product} />,
        CapturePortLayout: () => <CapturePortLayout product={product} />,
        ManagementPortLayout: () => <ManagementPortLayout product={product} />,
        CapturePorts: () => <CapturePorts product={product} />,
        ManagementPorts: () => <ManagementPorts product={product} />,
        AdditionalPorts: () => <AdditionalPorts product={product} />,
        PortLayoutImage: () => <PortLayoutImage product={product} />
    }
}

export function TocComponents() {
    return {
        h1: () => null,
        h2: (props: TocHeadingProps) => <TocHeading {...props} level={"h2"} />,
        h3: (props: TocHeadingProps) => <TocHeading {...props} level={"h3"} />,
        h4: (props: TocHeadingProps) => <TocHeading {...props} level={"h4"} />,
        h5: (props: TocHeadingProps) => <TocHeading {...props} level={"h5"} />,
        h6: (props: TocHeadingProps) => <TocHeading {...props} level={"h6"} />,
        pre: () => null,
        hr: () => null,
        p: () => null,
        ul: () => null,
        table: () => null,
        ContentBlock: () => null,
        CommandBlock: () => null,
        ProductName: () => null,
        SystemSpecification: () => null,
        NetworkSpecificationList: () => null,
        NetworkSpecificationTable: () => null,
        ModifiedLinkableTable: () => null,
        PowerSpec: () => null,
        CoolingSpec: () => null,
        EnvironmentSpec: () => null,
        PhysicalSpec: () => null,
        CapturePortLayout: () => null,
        ManagementPortLayout: () => null,
        PowerSupplies: () => null,
        CapturePorts: () => null,
        ManagementPorts: () => null,
        ManagementSpec: () => null,
        AdditionalPorts: () => null,
        Callout: () => null,
        PortLayoutImage: () => null,
        NetworkSpec: () => null,
        StorageSpec: () => null,
        CaptureSpec: () => null
    }
}
