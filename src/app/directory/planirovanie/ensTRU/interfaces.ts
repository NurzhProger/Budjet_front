export interface ensTRU_element {
    id: number,
    code: string,
    name_kaz: string,
    name_rus: string,
    harak_kaz: string,
    harak_rus: string,
    _tip_tru: string
}

export interface ensTRU_list {
    count?: number,
    next: string,
    previous?: string,
    results: [ensTRU_element]
}
export interface ensTRU_select {
    count?: number,
    next: string,
    previous?: string,
    results: [ensTRU_element]
}