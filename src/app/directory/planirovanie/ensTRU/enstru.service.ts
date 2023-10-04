import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ensTRU_element, ensTRU_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnsTRUService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<ensTRU_list> {
    return this.http.get<ensTRU_list>(this.host + 'dirs/enstrulist', { params })
  }

  fetchEnsTRU(ensTRU_id: number): Observable<ensTRU_element> {
    return this.http.get<ensTRU_element>(this.host + `dirs/enstruitem/${ensTRU_id}`)
  }

  add(param: ensTRU_element) {
    return this.http.post(this.host + 'dirs/enstruadd', param)
  }

  edit(param: ensTRU_element) {
    return this.http.post(this.host + 'dirs/enstruedit', param)
  }
}