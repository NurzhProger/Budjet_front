import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface marki_avto_element {
    id: number,
    name: string,
    engine_capacity: number,
    deleted: boolean,
    _tip_topliva: string,
    _vid_transporta: string

}

export interface marki_avto_list {
    count?: number,
    next: string,
    previous?: string,
    results: [marki_avto_element]
}


