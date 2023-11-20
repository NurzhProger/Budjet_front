import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { oblasti_element, oblasti_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OblastiService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


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
  obl_del(id: number) {
    return this.http.delete(this.host + `dirs/oblasti_regdelete/${id}`)
  }
}