import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ensTRU_element, ensTRU_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnsTRUService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(params: any): Observable<ensTRU_list> {
      return this.http.get<ensTRU_list>(this.host + 'dirs/enstrulist', { params })
  }

  fetchEnsTRU(ensTRU_id: number): Observable<ensTRU_element> {
      return this.http.get<ensTRU_element>(this.host + `dirs/dopl_nadbitem/${ensTRU_id}`)
  }

  add(param: ensTRU_element) {
      return this.http.post(this.host + 'dirs/enstruadd', param)
  }

  edit(param: ensTRU_element) {
    return this.http.post(this.host + 'dirs/enstruedit', param)
  }
}