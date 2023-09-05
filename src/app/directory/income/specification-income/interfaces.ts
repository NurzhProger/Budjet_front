export interface specification_income_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface specification_income_list {
    count?: number,
    next: string,
    previous?: string,
    results: [specification_income_detail]
}

export interface specification_income_select {
    count?: number,
    next: string,
    previous?: string,
    results: [specification_income_detail]
}