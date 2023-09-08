import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface regions__element {
    id: number,
    name: string,
    name_kaz: string,
    name_rus: string
}

export interface regions_list {
    count?: number,
    next: string,
    previous?: string,
    results: [regions__element]
}