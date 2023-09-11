export enum Direction {
  zn_string = "Строка",
  zn_float = "Число",
  zn_enstru = "Номенклатура",
  zn_stazh_category = "Стажы",
  zn_category_sotr = "Категории должностей",
  zn_dolzhnost = "Должности работников",
  zn_podrazdelenie = "Подразделение",
  zn_dopl_nadb = "Виды доплат и надбавок",
  zn_oblasti_reg = "Областии регионы",
  zn_ed_izm = "Едница измерений",
  zn_marki_avto = "Марки автомобилей"

}

export enum Direction1 {
  string = "Строка",
  float = "Число",
  enstru = "Номенклатура",
  stazh_category = "Стажы",
  category_sotr = "Категории должностей",
  dolzhnost = "Должности работников",
  podrazdelenie = "Подразделение",
  dopl_nadb = "Виды доплат и надбавок",
  oblasti_reg = "Областии регионы",
  ed_izm = "Едница измерений",
  marki_avto = "Марки автомобилей"

}





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
  tbl: [forms_tab1],
  dopl: [forms_dopl]

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
  columns_used: string,
  summ: number,
  _form: number,
  _doplata: number,
  _doplata_name: string,
  _sposob_ras: string,
}
