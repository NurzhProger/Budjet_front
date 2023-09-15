import { Budjet_detail } from "../income/budjet/interfaces"
import { budjet_reg__element } from "../planirovanie/budjet-reg/budjet-reg-list/interfaces"
import { regions__element } from "../planirovanie/regions/interfaces"

export interface organization_detail {
    id: number,
    bin: string,
    name_kaz: string,
    name_rus: string,
    adress: string,
    deleted: boolean,
    _budjet_reg: budjet_reg__element,
    _regiondar: regions__element
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
