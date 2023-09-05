import { fkr_detail } from '../../../directory/expenses/fkr/interfaces'
import { specification_income_detail } from '../../../directory/income/specification-income/interfaces'
import { organization_detail } from '../../../directory/organization/interfaces'

export interface utv_expenses_doc {
    id: number,
    nom: string,
    _date: string,
    deleted: boolean,
    _organization: organization_detail
}

export interface utv_expenses_payments {
    id: number,
    god: number,
    sm1: number,
    sm2: number,
    sm3: number,
    sm4: number,
    sm5: number,
    sm6: number,
    sm7: number,
    sm8: number,
    sm9: number,
    sm10: number,
    sm11: number,
    sm12: number,
    _date: string,
    _utv_exp: number,
    _organization: number,
    _fkr: fkr_detail,
    _spec: specification_income_detail
}

export interface utv_expenses_obligats {
    id: number,
    god: number,
    sm1: number,
    sm2: number,
    sm3: number,
    sm4: number,
    sm5: number,
    sm6: number,
    sm7: number,
    sm8: number,
    sm9: number,
    sm10: number,
    sm11: number,
    sm12: number,
    _date: string,
    _utv_exp: number,
    _organization: number,
    _fkr: fkr_detail,
    _spec: specification_income_detail
}

export interface utv_expenses_list {
    count?: number,
    next: string,
    previous?: string,
    results: [utv_expenses_doc]
}

export interface utv_expenses_detail {
    doc: utv_expenses_doc,
    payments: [utv_expenses_payments],
    obligats: [utv_expenses_obligats]
}