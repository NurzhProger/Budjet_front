export interface tip_tru_element {
    name: string
}

export interface tip_tru_list {
    count?: number,
    next: string,
    previous?: string,
    results: [tip_tru_element]
}