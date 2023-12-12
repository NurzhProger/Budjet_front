import { specification_income_detail } from "src/app/directory/income/specification-income/interfaces"
import { organization_detail } from "src/app/directory/organization/interfaces"

export interface budget_income_list {
    count?: number,
    next: string,
    previous?: string,
    results: [budget_income_doc]
}

export interface budget_income_doc {
    id: number,
    nom: string,
    _organization: organization_detail,
    _date: string,
    god_ucheta: string,
    deleted: boolean,
    comment: string,
    summ: number
}

export interface budget_income_head {
    id: number,
    nom: string,
    _organization: organization_detail,
    _date: string,
    god_ucheta: string,
    deleted: boolean,
    comment: string,
    summ: number
}

export interface spec_budjet {
    id: number,
    _budjet_income: {
        id: number,
        nom: string,
        org_name: string
    }
    _spec_income: specification_income_detail,
    summ: number
}
export interface budget_income_detail {
    head: budget_income_head,
    tbl: [spec_budjet]
}