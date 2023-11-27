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

