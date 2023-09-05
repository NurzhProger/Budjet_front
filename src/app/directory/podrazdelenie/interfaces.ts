export interface podrazdelenie_element {
    id: number,
    name: string,
    name_kaz: string,
    name_rus: string,
}

export interface podrazdelenie_list {
    count?: number,
    next: string,
    previous?: string,
    results: [podrazdelenie_element]
}