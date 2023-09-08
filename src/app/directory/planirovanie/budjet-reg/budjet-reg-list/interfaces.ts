import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface budjet_reg__element {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface budjet_reg_list {
    count?: number,
    next: string,
    previous?: string,
    results: [budjet_reg__element]
}