export interface Budjet_detail {
  adress: '',
  id: number,
  code: string,
  name_kaz: string,
  name_rus: string
}

export interface Budjet_list {
  count?: number,
  next: string,
  previous?: string,
  results: [Budjet_detail]
}

export interface Budjet_select {
  count?: number,
  next: string,
  previous?: string,
  results: [Budjet_detail]
}
