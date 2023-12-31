import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { budjet_reg__element, budjet_reg_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BudjetRegService {

  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<budjet_reg_list> {
    return this.http.get<budjet_reg_list>(this.host + 'dirs/budjet_reglist', { params })
  }

  fetchBudjetReg(budjetreg_id: number): Observable<budjet_reg__element> {
    return this.http.get<budjet_reg__element>(this.host + `dirs/budjet_regitem/${budjetreg_id}`)
  }

  // add(param: oblasti_element) {
  //     return this.http.post(this.host + 'dirs/oblasti_regadd', param)
  // }

  // edit(param: oblasti_element) {
  //   return this.http.post(this.host + 'dirs/oblasti_regedit', param)
  // }
}