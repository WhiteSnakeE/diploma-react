import {VoltageAndCurrents} from "./VoltageAndCurrents";
import {Connect} from "./Connect";

export type PowerUnit = {
    _id: string,
    name: string,
    price: number,
    status: string | null,
    img: string,
    power: number,
    formFactor: string,
    voltageAndCurrents:VoltageAndCurrents,
    connect: Connect
}