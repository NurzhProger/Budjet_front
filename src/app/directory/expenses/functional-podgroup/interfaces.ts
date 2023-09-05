export interface func_podgroup_detail {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string
}

export interface func_podgroup_list {
    count?: number,
    next: string,
    previous?: string,
    results: [func_podgroup_detail]
}
export interface func_podgroup_select {
    count?: number,
    next: string,
    previous?: string,
    results: [func_podgroup_detail]
}