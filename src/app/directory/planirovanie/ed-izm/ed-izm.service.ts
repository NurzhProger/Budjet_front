import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ed_izm_element, ed_izm_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EdIzmService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<ed_izm_list> {
    return this.http.get<ed_izm_list>(this.host + 'dirs/ed_izmlist', { params })
  }

  fetchEdIzm(edizm_id: number): Observable<ed_izm_element> {
    return this.http.get<ed_izm_element>(this.host + `dirs/ed_izmitem/${edizm_id}`)
  }

  add(param: ed_izm_element) {
    return this.http.post(this.host + 'dirs/ed_izmadd', param)
  }

  edit(param: ed_izm_element) {
    return this.http.post(this.host + 'dirs/ed_izmedit', param)
  }
  ed_del(id: number) {
    return this.http.delete(this.host + `dirs/ed_izmdelete/${id}`)
  }
}