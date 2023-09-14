
export interface Ras4et_doc{
  head:Ras4et_head,
  tbl:[TableItem],
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

interface TableItem {
  stroka: number;
  children: [ChildItem];
}

export interface ChildItem  {

  id: number;
  name: string;
  column: number;
  columns_used: string;
  itog: boolean;
  stroka: number;
  zn: string;
  zn_string: string | null;
  zn_float: number | null;
  zn_enstru: number | null;
  zn_stazh_category: number | null;
  zn_category_sotr: number | null;
  zn_dolzhnost: number | null;
  zn_podrazdelenie: number | null;
  zn_dopl_nadb: number | null;
  zn_oblasti_reg: number | null;
  zn_marki_avto: number | null;
  zn_ed_izm: number | null;

}

export interface Ras4et_dopl {
  id: number;
  summ: number;
  columns_used: string;
  stroka: number;
  _doplata: number;
  _sposob_ras: string;
}
