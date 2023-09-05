export interface func_group_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface func_group_list {
    count?: number,
    next: string,
    previous?: string,
    results: [func_group_detail]
}
export interface func_group_select {
    count?: number,
    next: string,
    previous?: string,
    results: [func_group_detail]
}