export interface programm_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface programm_list {
    count?: number,
    next: string,
    previous?: string,
    results: [programm_detail]
}

export interface programm_select {
    count?: number,
    next: string,
    previous?: string,
    results: [programm_detail]
}