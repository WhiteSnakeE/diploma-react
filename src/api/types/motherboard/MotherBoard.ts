import {Platform} from "./Platform";
import {Memory} from "./Memory";
import {NetworkAndMultimedia} from "./ NetworkAndMultimedia";
import {ExpansionSlots} from "./ExpansionSlots";
import {InternalInterfaces} from "./InternalInterfaces";

export type MotherBoard = {
    _id: string,
    name:string,
    price:number,
    platform: Platform|null,
    max_TDP_proccesor: string,
    memory: Memory|null,
    network_and_multimedia: NetworkAndMultimedia|null,
    expansion_slots: ExpansionSlots|null,
    internal_interfaces: InternalInterfaces|null,
    status: string | null
}


