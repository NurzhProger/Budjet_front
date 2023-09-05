export interface podclass_interfaces_detail {
  id: number,
  code: string,
  name_kaz: string,
  name_rus: string
}

export interface podclass_interfaces {
  count?: number,
  next: string,
  previous?: string,
  results: [podclass_interfaces_detail]
}
