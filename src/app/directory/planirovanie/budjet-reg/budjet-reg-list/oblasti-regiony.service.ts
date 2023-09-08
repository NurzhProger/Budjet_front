import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { budjet_reg__element, budjet_reg_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudjetRegService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(params: any): Observable<budjet_reg_list> {
      return this.http.get<budjet_reg_list>(this.host + 'dirs/budjet_reglist', { params })
  }

  // fetchOblast(oblasti_id: number): Observable<oblasti_element> {
  //     return this.http.get<oblasti_element>(this.host + `dirs/oblasti_regitem/${oblasti_id}`)
  // }

  // add(param: oblasti_element) {
  //     return this.http.post(this.host + 'dirs/oblasti_regadd', param)
  // }

  // edit(param: oblasti_element) {
  //   return this.http.post(this.host + 'dirs/oblasti_regedit', param)
  // }
}