import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { oblasti_element, oblasti_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OblastiService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(params: any): Observable<oblasti_list> {
      return this.http.get<oblasti_list>(this.host + 'dirs/oblasti_reglist', { params })
  }

  fetchOblast(oblasti_id: number): Observable<oblasti_element> {
      return this.http.get<oblasti_element>(this.host + `dirs/oblasti_regitem/${oblasti_id}`)
  }

  add(param: oblasti_element) {
      return this.http.post(this.host + 'dirs/oblasti_regadd', param)
  }

  edit(param: oblasti_element) {
    return this.http.post(this.host + 'dirs/oblasti_regedit', param)
  }
}