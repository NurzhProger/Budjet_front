import { fkr_detail } from "src/app/directory/expenses/fkr/interfaces";
import { budjet_detail } from "../Budget_request/budget_request.interfaces";
import { specification_income_detail } from "src/app/directory/income/specification-income/interfaces";
import { form_list_doc } from "src/app/directory/income/forms/forms_interfaces";

export interface Ras4et_doc {
  head: Ras4et_head,
  head_table: [Ras4et_head_table],
  tbl: [ChildItem],
  dopl: [Ras4et_dopl]
}

export interface Ras4et_head_table {
  name: string
}

export interface Ras4et_head {
  id: number,
  _planirovanie: budjet_detail,
  _fkr: fkr_detail,
  _spec: specification_income_detail,
  _form: form_list_doc

  
  // summ: number,
  // _fkr: number,
  // fkrname: string,
  // fkrcode: number,
  // _spec: number,
  // specname: string,
  // speccode: string,
  // _form: number,
  // formname: string,
  // formhead: string
}

export interface TableItem {
  children: [ChildItem];
}

export interface ChildItem {
  id: number;
  name: string;
  column: number;
  columns_used: string;
  itog: boolean;
  total: boolean;
  stroka: number;
  zn: string;
  zn_string: string | null;
  zn_float: number | null;
  zn_enstru: number;
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


export interface TableItemPass {
  stroka: number;
  children: [Child];
}


export interface Child {

  id: number;
  name_zn: string;
  namecolumn: number;
  code: string;

}
