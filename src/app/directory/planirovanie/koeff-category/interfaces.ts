import { category_sotr_element } from "../category-sotr/interfaces"
import { stazh_category_element } from "../stazh-category/interfaces"

export interface koeff_category_element {
    id: number,
    period: string,
    koefficient: number,
    _category: category_sotr_element,
    _stazh: stazh_category_element,
}

export interface koeff_category_list {
    count?: number,
    next: string,
    previous?: string,
    results: [koeff_category_element]
}