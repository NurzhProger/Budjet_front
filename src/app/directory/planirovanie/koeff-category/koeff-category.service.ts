import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { koeff_category_element, koeff_category_list } from './interfaces';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KoeffCategoryService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<koeff_category_list> {
    return this.http.get<koeff_category_list>(this.host + 'dirs/koeff_categorylist', { params })
  }

  fetchKoeff(koeff_id: number): Observable<koeff_category_element> {
    return this.http.get<koeff_category_element>(this.host + `dirs/koeff_categoryitem/${koeff_id}`)
  }

  add(param: koeff_category_element) {
    return this.http.post(this.host + 'dirs/koeff_categoryadd', param)
  }

  edit(param: koeff_category_element) {
    return this.http.post(this.host + 'dirs/koeff_categoryedit', param)
  }

  koeff_del(id: number) {
    return this.http.delete(this.host + `dirs/koeff_categorydelete/${id}`)
  }
}