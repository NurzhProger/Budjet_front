import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface period_pokaz_element {
    id: number,
    period: string,
    znachenie: number,
    _pokazatel: string
}

export interface period_pokaz_list {
    count?: number,
    next: string,
    previous?: string,
    results: [period_pokaz_element]
}