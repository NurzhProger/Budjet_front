import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category_sotr_element, category_sotr_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorySotrService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(params: any): Observable<category_sotr_list> {
      return this.http.get<category_sotr_list>(this.host + 'dirs/category_sotrlist', { params })
  }

  fetchCategory(category_id: number): Observable<category_sotr_element> {
      return this.http.get<category_sotr_element>(this.host + `dirs/category_sotritem/${category_id}`)
  }

  add(param: category_sotr_element) {
      return this.http.post(this.host + 'dirs/category_sotradd', param)
  }

  edit(param: category_sotr_element) {
    return this.http.post(this.host + 'dirs/category_sotredit', param)
  }
}
