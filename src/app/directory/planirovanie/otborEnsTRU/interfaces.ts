import { specification_expenses_detail } from "../../expenses/specification-exp/interfaces"
import { form_detail, form_list_doc } from "../../income/forms/forms_interfaces"
import { specification_income_detail } from "../../income/specification-income/interfaces"
import { ensTRU_element } from "../ensTRU/interfaces"

export interface otbor_ensTRU_element {
    id: number,
    _enstru: ensTRU_element,
    _form: form_list_doc,
    _spec: specification_expenses_detail
}

export interface otbor_ensTRU_list {
    count?: number,
    next: string,
    previous?: string,
    results: [otbor_ensTRU_element]
}
export interface otbor_ensTRU_select {
    count?: number,
    next: string,
    previous?: string,
    results: [otbor_ensTRU_element]
}