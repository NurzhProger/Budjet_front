import { organization_detail } from "src/app/directory/organization/interfaces"

export interface svod_doc {
    id: number,
    nom: string,
    org_name: string,
    _organization: organization_detail,
    _date: string,
    god_ucheta: string,
    deleted: boolean,
    comment: string,
    _vid_dannyh: string,
    _vid_operacii: string,
    _vid_rashoda: string
}

export interface svod_list {
    count?: number,
    next: string,
    previous?: string,
    results: [svod_doc]
}

export interface svod_head {
    id: number,
    _organization: organization_detail,
    nom: string,
    _date: string,
    deleted: boolean,
    god_ucheta: string,
    comment: string,
    _vid_dannyh: string,
    _vid_operacii: string,
    _vid_rashoda: string
}

export interface svod_doc_tab {
    id: number,
    _planirovanie: svod_doc,
    summ: number
}
