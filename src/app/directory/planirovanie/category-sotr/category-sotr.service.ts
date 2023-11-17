import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category_sotr_detail, category_sotr_element, category_sotr_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategorySotrService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<category_sotr_list> {
    return this.http.get<category_sotr_list>(this.host + 'dirs/category_sotrlist', { params })
  }

  fetchCategory(category_id: number): Observable<category_sotr_detail> {
    return this.http.get<category_sotr_detail>(this.host + `dirs/category_sotritem/${category_id}`)
  }

  add(param: category_sotr_detail) {
    return this.http.post(this.host + 'dirs/category_sotradd', param)
  }

  edit(param: category_sotr_detail) {
    return this.http.post(this.host + 'dirs/category_sotredit', param)
  }

  category_del(id: number) {
    return this.http.delete(this.host + `dirs/category_sotrdelete/${id}`)
  }
}
