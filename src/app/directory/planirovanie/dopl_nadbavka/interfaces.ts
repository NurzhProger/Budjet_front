export interface doplaty_nadbavky_element {
    id: number,
    name: string,
    name_kaz: string,
    name_rus: string,
    for_nalog: boolean,
    for_rb: boolean,
    _tip_dopl: string
}

export interface doplaty_nadbavky_list {
    count?: number,
    next: string,
    previous?: string,
    results: [doplaty_nadbavky_element]
}