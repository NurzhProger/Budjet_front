export interface stavka_element {
    name: string
}

export interface stavka_list {
    count?: number,
    next: string,
    previous?: string,
    results: [stavka_element]
}