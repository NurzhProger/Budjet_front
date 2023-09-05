import { classsification_income } from "src/app/directory/income/classification-income/interfaces"

export interface izm_inc_doc_tab {
  id: number,
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
  sm11: number,
  sm12: number,
  utv1: number,
  utv2: number,
  utv3: number,
  utv4: number,
  utv5: number,
  utv6: number,
  utv7: number,
  utv8: number,
  utv9: number,
  utv10: number,
  utv11: number,
  utv12: number,
  itog1: number,
  itog2: number,
  itog3: number,
  itog4: number,
  itog5: number,
  itog6: number,
  itog7: number,
  itog8: number,
  itog9: number,
  itog10: number,
  itog11: number,
  itog12: number,
  _classification: classsification_income
}

export interface izm_inc_doc {
  id: number,
  nom: string,
  _date: string,
  deleted: boolean,
  _organization: number,
  org_name: string,
  _budjet: number,
  budjet_name: string,
  _type_izm_doc: number,
  type_izm_name: string
}

export interface izm_inc_doc_detail {
  doc: izm_inc_doc,
  tbl1: [izm_inc_doc_tab]

}

export interface izm_inc_doc_list {
  count?: number,
  next: string,
  previous?: string,
  results: [izm_inc_doc]

}


