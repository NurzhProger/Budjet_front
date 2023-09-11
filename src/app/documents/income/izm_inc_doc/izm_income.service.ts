import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { izm_inc_doc_tab, izm_inc_doc, izm_inc_doc_detail, izm_inc_doc_list } from './interfaces';



@Injectable({
  providedIn: 'root'
})


export class IzmIncomeService {
  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(params: any): Observable<izm_inc_doc_list> {
    return this.http.get<izm_inc_doc_list>(this.host + 'docs/izminclist', { params })
  }

  fetch_detail(izm_inc_id: string): Observable<izm_inc_doc_detail> {
    return this.http.get<izm_inc_doc_detail>(this.host + `docs/izmincitem/${izm_inc_id}`)
  }

  saveIzm(izm_inc: izm_inc_doc_detail) {
    return this.http.post(this.host + 'docs/izmincsave', izm_inc)
  }

  getOstatok(params: any): Observable<any> {
    return this.http.get<any>(this.host + 'docs/incgetplanbyclassif', { params })
  }

  deleteIzm(izm_inc_id: number = 0) {
    return this.http.delete(this.host + `docs/izmincdelete/${izm_inc_id}`)
  }

  gettypespr() {
    return this.http.get(this.host + 'dirs/typeincdoclist')
  }
}
