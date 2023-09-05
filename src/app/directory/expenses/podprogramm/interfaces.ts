export interface podprogramm_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface podprogramm_list {
    count?: number,
    next: string,
    previous?: string,
    results: [podprogramm_detail]
}
export interface podprogramm_select {
    count?: number,
    next: string,
    previous?: string,
    results: [podprogramm_detail]
}