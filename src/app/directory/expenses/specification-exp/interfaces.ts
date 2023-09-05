export interface specification_expenses_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface specification_expenses_list {
    count?: number,
    next: string,
    previous?: string,
    results: [specification_expenses_detail]
}

export interface specification_expenses_select {
    count?: number,
    next: string,
    previous?: string,
    results: [specification_expenses_detail]
}