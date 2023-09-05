export interface import219_detail {
  doc: import219_doc,
  tbl1: [import219_tab]
}


export interface import219_doc {
  id: number,
  nom: string,
  _date: string,
  delete: boolean,
  _budjet_id: number,
  _organization_id: number

}

export interface import219_list {
  count?: number,
  next: string,
  previous?: string,
  results: [import219_doc]
}


export interface import219_tab {
  id: number,
  _date: string,
  deleted: boolean,
  sm1: number,
  sm2: number,
  sm3: number,
  sm4: number,
  sm5: number,
  sm6: number,
  sm7: number,
  sm8: number,
  sm9: number,
  sm10: number,
  _budjet_id: number,
  _classification_id: number,
  _izm_inc_id: number,
  _organization_id: number
}
