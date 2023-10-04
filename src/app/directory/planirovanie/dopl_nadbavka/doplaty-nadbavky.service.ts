import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doplaty_nadbavky_element, doplaty_nadbavky_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoplatyNadbavkyService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<doplaty_nadbavky_list> {
    return this.http.get<doplaty_nadbavky_list>(this.host + 'dirs/dopl_nadblist', { params })
  }

  fetchDoplata(doplata_id: number): Observable<doplaty_nadbavky_element> {
    return this.http.get<doplaty_nadbavky_element>(this.host + `dirs/dopl_nadbitem/${doplata_id}`)
  }

  add(param: doplaty_nadbavky_element) {
    return this.http.post(this.host + 'dirs/dopl_nadbadd', param)
  }

  edit(param: doplaty_nadbavky_element) {
    return this.http.post(this.host + 'dirs/dopl_nadbedit', param)
  }
}