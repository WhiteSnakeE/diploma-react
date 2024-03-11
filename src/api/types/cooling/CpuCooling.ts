export type CpuCooling = {
    id: string,
    name: string,
    price: number,
    img: string,
    status: string | null,
    sockets: string[],
    tdp: number,
    speed: string,
    stream: string,
    noiseLevel: number,
    type: string,
    size: string
}