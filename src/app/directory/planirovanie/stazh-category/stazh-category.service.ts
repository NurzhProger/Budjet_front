import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stazh_category_element, stazh_category_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StazhCategoryService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(params: any): Observable<stazh_category_list> {
      return this.http.get<stazh_category_list>(this.host + 'dirs/stazh_categorylist', { params })
  }

  fetchStazh(stazh_id: number): Observable<stazh_category_element> {
      return this.http.get<stazh_category_element>(this.host + `dirs/stazh_categoryitem/${stazh_id}`)
  }

  add(param: stazh_category_element) {
      return this.http.post(this.host + 'dirs/stazh_categoryadd', param)
  }

  edit(param: stazh_category_element) {
    return this.http.post(this.host + 'dirs/stazh_categoryedit', param)
  }
}