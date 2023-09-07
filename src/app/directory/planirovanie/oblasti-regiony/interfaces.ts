import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface oblasti_element {
    id: number,
    name: string,
    deleted: boolean
}

export interface oblasti_list {
    count?: number,
    next: string,
    previous?: string,
    results: [oblasti_element]
}