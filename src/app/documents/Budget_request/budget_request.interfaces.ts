import { fkr_detail } from "src/app/directory/expenses/fkr/interfaces"
import { form_list_doc } from "src/app/directory/income/forms/forms_interfaces"
import { specification_income_detail } from "src/app/directory/income/specification-income/interfaces"
import { organization_detail } from "src/app/directory/organization/interfaces"

export interface budget_list {
    count?: number,
    next: string,
    previous?: string,
    results: [budjet_doc]
}

export interface budjet_doc {
    id: number,
    nom: string,
    _organization: organization_detail,
    _date: string,
    god_ucheta: string,
    deleted: boolean,
    _vid_dannyh: string,
    _vid_operacii: string,
    _vid_rashoda: string,
    comment: string
}

export interface budjet_detail {
    doc: budjet_doc,
    tbl: [budjet_doc_tab]
}

export interface budjet_doc_tab {
    id: number,
    _fkr: fkr_detail,
    _spec: specification_income_detail,
    _form: form_list_doc,
    summ: number,
    _planirovanie: number
}