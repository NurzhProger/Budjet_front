export interface koeff_category_element {
    id: number,
    period: string,
    koefficient: number,
    _category: number,
    category_name: string,
    _stazh: number,
    stazh_name: string
}

export interface koeff_category_list {
    count?: number,
    next: string,
    previous?: string,
    results: [koeff_category_element]
}