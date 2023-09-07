export interface tip_topliva_element {
    name: string
}

export interface tip_topliva_list {
    count?: number,
    next: string,
    previous?: string,
    results: [tip_topliva_element]
}