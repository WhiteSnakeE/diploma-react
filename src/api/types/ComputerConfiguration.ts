import {Motherboard} from "./motherboard/Motherboard";
import {Processor} from "./processor/Processor";
import {Ram} from "./ram/Ram";
import {Videocard} from "./videocard/Videocard";


export type ComputerConfiguration = {
    motherboard: Motherboard | null;
    processor: Processor | null;
    ram: Ram | null;
    videocard: Videocard | null;
}