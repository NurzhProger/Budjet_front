export interface doplata_element {
    name: string
}

export interface doplata_list {
    count?: number,
    next: string,
    previous?: string,
    results: [doplata_element]
}