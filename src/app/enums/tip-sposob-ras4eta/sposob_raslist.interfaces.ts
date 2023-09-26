export interface Sposob_ras4eta_element {
  name: string
}

export interface Sposob_ras4eta_list {
  count?: number,
  next: string,
  previous?: string,
  results: [Sposob_ras4eta_element]
}
