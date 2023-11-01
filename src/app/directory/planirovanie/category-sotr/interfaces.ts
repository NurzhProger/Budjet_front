import { stazh_category_element } from "../stazh-category/interfaces"

export interface category_sotr_element {
    id: number,
    name: string,
    deleted: boolean,
    parent_name: string,
    parent?: any,
    group: boolean
}

export interface category_sotr_list {
    count?: number,
    next: string,
    previous?: string,
    results: [category_sotr_element]
}

export interface category_sotr_detail {
    category_sotrudnikov: category_sotr_element,
    tbl: [category_sotr_tab]
}

export interface category_sotr_tab {
    id: number,
    _category: category_sotr_element,
    _stazh: stazh_category_element,
    period: string,
    koefficient: number
}

// export interface organization_select {
//     count?: number,
//     next: string,
//     previous?: string,
//     results: [organization_detail]
// }
