export interface budget_list {
  count?: number,
  next: string,
  previous?: string,
  results: [budget_list_doc]
}

export interface budget_list_doc {
  id: number,
  org_name: string,
  nom: string,
  _organization: number,
  _date: string,
  god_ucheta: string,
  _vid_dannyh: string,
  _vid_operacii: string,
  deleted: boolean,
}

export interface Budget_detail {
  doc: budget_list_doc,
  tbl: [budget_tabl]

}


export interface budget_tabl {
  id: number,
  _planirovanie: number,
  summ: number,
  _fkr: number,
  fkrname: string,
  fkrcode: string,
  _spec: number,
  specname: string,
  speccode: string,
  _form: number,
  formname: string,
  formhead: string
}



export interface Ras4et_list{
  head:[Ras4et_head],
  tbl:[Ras4et_tabl],
  dopl:[Ras4et_dopl]
}

export interface Ras4et_head {
  id: number,
  _planirovanie: number,
  summ: number,
  _fkr: number,
  fkrname: string,
  fkrcode: number,
  _spec: number,
  specname: string,
  speccode: string,
  _form: number,
  formname: string,
  formhead: string
}

export interface Ras4et_tabl {

  new_str: number;
  id: number;
  name: string;
  column: number;
  columns_used: string;
  stroka: number;
  zn: string;
  zn_string: string | null;
  zn_float: number | null;
  zn_enstru: number | null;
  zn_stazh_category: string | null;
  zn_category_sotr: string | null;
  zn_dolzhnost: string | null;
  zn_podrazdelenie: string | null;
  zn_dopl_nadb: string | null;
  zn_oblasti_reg: string | null;
  zn_marki_avto: string | null;
  zn_ed_izm: string | null;

}

export interface Ras4et_dopl {
  id: number;
  summ: number;
  columns_used: string;
  stroka: number;
  _doplata: number;
  _sposob_ras: string;
}

