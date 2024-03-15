import {Cooling} from "./Cooling";
import {BaysAndSlots} from "./BaysAndSlots";

export type Frame = {
    _id: string,
    name: string,
    price: number,
    img: string,
    status: string | null,
    size: string,
    powerUnitFormFactor: string | null,
    cooling: Cooling,
    baysAndSlots: BaysAndSlots,
    type: string,
    maxCoolerHeight: number,
    maxGpuWidth: number
}