export interface abp_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface abp_list {
    count?: number,
    next: string,
    previous?: string,
    results: [abp_detail]
}

export interface abp_select {
    count?: number,
    next: string,
    previous?: string,
    results: [abp_detail]
}