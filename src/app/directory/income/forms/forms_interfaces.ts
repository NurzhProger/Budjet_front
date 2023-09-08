export interface form_list_doc {
  id: number,
  name: string,
  head_form: string,
  num_app: number,
  spec_code: string,
  spec_name: string,
  _spec: number
}

export interface form_list {
  count?: number,
  next: string,
  previous?: string,
  results: [form_list_doc]
}


export interface form_detail {
  form: form_list_doc,
  tb1: forms_tab1,
  dopl: forms_dopl

}

export interface forms_tab1 {
  id: number,
  name: string,
  column: number,
  columns_used: string,
  zn: string,
  zn_string: null,
  zn_float: null,
  zn_enstru: null,
  zn_stazh_category: null,
  zn_category_sotr: null,
  zn_dolzhnost: null,
  zn_podrazdelenie: null,
  zn_dopl_nadb: null,
  zn_oblasti_reg: null,
  zn_marki_avto: null,
  zn_ed_izm: null
}


export interface forms_dopl {
  id: number,
  column: number,
  columns_used: string,
  summ: number,
  _form: number,
  doplata: number,

}
