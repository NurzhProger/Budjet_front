import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { limit_element, limit_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimitService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(params: any): Observable<limit_list> {
      return this.http.get<limit_list>(this.host + 'docs/limit_planlist', { params })
  }

  fetchOblast(limit_id: number): Observable<limit_element> {
      return this.http.get<limit_element>(this.host + `docs/oblasti_regitem/${limit_id}`)
  }

  add(param: limit_element) {
      return this.http.post(this.host + 'docs/oblasti_regadd', param)
  }

  edit(param: limit_element) {
    return this.http.post(this.host + 'docs/oblasti_regedit', param)
  }
}