import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface limit_element {
    id: number,
    nom: string,
    org_name: string,
    _organization: number,
    _date: string,
    god_ucheta: string
}

export interface limit_list {
    count?: number,
    next: string,
    previous?: string,
    results: [limit_element]
}