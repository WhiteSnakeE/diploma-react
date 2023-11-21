import {Platform} from "./Platform";
import {Memory} from "./Memory";
import {NetworkAndMultimedia} from "./ NetworkAndMultimedia";
import {ExpansionSlots} from "./ExpansionSlots";
import {InternalInterfaces} from "./InternalInterfaces";

export type MotherBoard = {
    _id: string,
    name:string,
    price:number,
    platform: Platform,
    max_TDP_proccesor: string,
    memory: Memory,
    network_and_multimedia: NetworkAndMultimedia,
    expansion_slots: ExpansionSlots,
    internal_interfaces: InternalInterfaces,
    status:string|null
}


