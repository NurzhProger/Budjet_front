import { organization_detail } from "src/app/directory/organization/interfaces"
import { doplata_element } from "src/app/enums/tip_dopl/tip-dopl/interfaces"
export interface limit_doc {
    id: number,
    nom: string,
    org_name: string,
    _organization: organization_detail,
    _date: string,
    god_ucheta: string
}

export interface limit_list {
    count?: number,
    next: string,
    previous?: string,
    results: [limit_doc]
}

export interface limit_doc_tab {
    id: number,
    _fkr: number,
    summ: number,
    fkrcode: string,
    fkrname: string,
    _limit_plan: number
}

export interface limit_detail {
    head: limit_doc,
    tbl1: [limit_doc_tab]
}