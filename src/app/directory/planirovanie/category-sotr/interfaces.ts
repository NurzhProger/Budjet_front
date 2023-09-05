
export interface category_sotr_element {
    id: number,
    name: string,
    deleted: string,
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

// export interface organization_select {
//     count?: number,
//     next: string,
//     previous?: string,
//     results: [organization_detail]
// }
