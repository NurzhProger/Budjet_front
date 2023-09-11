import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { period_pokaz_element, period_pokaz_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodPokazService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(params: any): Observable<period_pokaz_list> {
      return this.http.get<period_pokaz_list>(this.host + 'dirs/period_pokazlist', { params })
  }

  fetchPeriodPokaz(periodpokaz_id: number): Observable<period_pokaz_element> {
      return this.http.get<period_pokaz_element>(this.host + `dirs/period_pokazitem/${periodpokaz_id}`)
  }

  add(param: period_pokaz_element) {
      return this.http.post(this.host + 'dirs/period_pokazadd', param)
  }

  edit(param: period_pokaz_element) {
    return this.http.post(this.host + 'dirs/period_pokazedit', param)
  }
}