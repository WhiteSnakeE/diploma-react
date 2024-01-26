import {Platform} from "./Platform";
import {Memory} from "./Memory";
import {NetworkAndMultimedia} from "./ NetworkAndMultimedia";
import {ExpansionSlots} from "./ExpansionSlots";
import {InternalInterfaces} from "./InternalInterfaces";

export type Motherboard = {
    _id: string,
    name: string,
    price: number,
    platform: Platform | null,
    maxTDPProccesor: number,
    memory: Memory | null,
    networkAndMultimedia: NetworkAndMultimedia | null,
    expansionSlots: ExpansionSlots | null,
    internalInterfaces: InternalInterfaces | null,
    status: string | null,
    img: string
}


