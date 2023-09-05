export interface dolzhnost_element {
    id: number,
    name: string,
    name_kaz: string,
    name_rus: string,
    _podrazdelenie: number,
    podrazdelenie_name: string

}

export interface dolzhnost_list {
    count?: number,
    next: string,
    previous?: string,
    results: [dolzhnost_element]
}