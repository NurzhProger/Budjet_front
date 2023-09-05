import { category_income_detail } from "../category-income/interfaces"
import { class_income_detail } from "../class-income/interfaces"
import { PodclassDetailComponent } from "../podclass/podclass-detail/podclass-detail.component"
import { podclass_interfaces_detail } from "../podclass/podclass_interfaces"
import { specification_income_detail } from "../specification-income/interfaces"

export interface classsification_income {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface classsification_income_list {
    count?: number,
    next: string,
    previous?: string,
    results: [classsification_income]
}

export interface classsification_income_select {
    count?: number,
    next: string,
    previous?: string,
    results: [classsification_income]
}

export interface classsification_income_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string,
    _category: category_income_detail,
    _classs: class_income_detail,
    _podclass: podclass_interfaces_detail,
    _spec: specification_income_detail
}