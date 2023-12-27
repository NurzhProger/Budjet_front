import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { otbor_ensTRU_element, otbor_ensTRU_list } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OtborEnsTRUService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<otbor_ensTRU_list> {
    return this.http.get<otbor_ensTRU_list>(this.host + 'dirs/tru_filter_list', { params })
  }

  fetchSelect(params: any): Observable<otbor_ensTRU_list> {
    return this.http.post<otbor_ensTRU_list>(this.host + 'dirs/tru_filter_select', { params })
  }

  fetchEnsTRU(ensTRU_id: number): Observable<otbor_ensTRU_element> {
    return this.http.get<otbor_ensTRU_element>(this.host + `dirs/tru_filter_item/${ensTRU_id}`)
  }

  // add(param: ensTRU_element) {
  //   return this.http.post(this.host + 'dirs/enstruadd', param)
  // }

  edit(param: otbor_ensTRU_element) {
    return this.http.post(this.host + 'dirs/tru_filter_save', param)
  }
}