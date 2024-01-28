import {Motherboard} from "./motherboard/Motherboard";
import {Processor} from "./processor/Processor";
import {Ram} from "./ram/Ram";


export type ComputerConfiguration = {
    motherboard: Motherboard | null;
    processor: Processor | null;
    ram: Ram | null;
}