import {CoreFrequency} from "./CoreFrequency";
import {CacheCapacity} from "./CacheCapacity";
import {IntegratedVideocard} from "./IntegratedVideocard";

export type Processor = {
    _id: string,
    name: string,
    price: number,
    socket: string,
    core_frequency: CoreFrequency,
    number_of_cores: number,
    number_of_threads: number,
    memory_type: string[],
    max_memory_frequency: number,
    core: string,
    cache_capacity: CacheCapacity,
    integratedvideocard: IntegratedVideocard,
    TDP: number,
    status: string | null,
    img: string
    pci_express_revision: number[]

}