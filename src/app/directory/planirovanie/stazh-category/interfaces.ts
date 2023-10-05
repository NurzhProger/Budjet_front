export interface stazh_category_element {
    id: number,
    name: string,
    ot: number,
    do: number,
}

export interface stazh_category_list {
    count?: number,
    next: string,
    previous?: string,
    results: [stazh_category_element]
}
export interface stazh_category_select {
    count?: number,
    next: string,
    previous?: string,
    results: [stazh_category_element]
}