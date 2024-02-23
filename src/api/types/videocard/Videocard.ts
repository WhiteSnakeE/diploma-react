export type Videocard = {
    _id: string,
    name: string,
    price: number,
    manufacturer: string,
    model: string,
    memoryCapacity: number,
    memoryType: string,
    memoryBus: string,
    directX: string,
    coreFrequency: string,
    memoryFrequency: string,
    connectionInterface: string,
    connectors: string[],
    energyConsumption: number,
    powerUnit: number,
    status: string | null,
    img: string
}