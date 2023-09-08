import { Budjet_detail } from "../income/budjet/interfaces"

export interface organization_detail {
    id: number,
    bin: string,
    name_kaz: string,
    name_rus: string,
    adress: string,
    deleted: boolean,
    budjet_name: string,
    _budjet_reg: number,
    region_name: string,
    _regiondar: number
}

export interface organization_list {
    count?: number,
    next: string,
    previous?: string,
    results: [organization_detail]
}

export interface organization_select {
    count?: number,
    next: string,
    previous?: string,
    results: [organization_detail]
}
