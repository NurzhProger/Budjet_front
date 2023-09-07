import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface ed_izm_element {
    id: number,
    name: string,
    code: number,
    usl_oboz: string

}

export interface ed_izm_list {
    count?: number,
    next: string,
    previous?: string,
    results: [ed_izm_element]
}