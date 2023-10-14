import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ras4et_doc } from "./Budget_ras4et.interfaces";
import { budjet_detail } from "../Budget_request/budget_request.interfaces";
import { AuthService } from "src/app/login/auth.service";


@Injectable({
  providedIn: 'root'
})


export class budjetRas4et_Service {

  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch_detail(params: any): Observable<Ras4et_doc> {
    return this.http.post<Ras4et_doc>(this.host + 'docs/raschetitem', params)
  }

  saveLimit(ras4et: Ras4et_doc) {
    return this.http.post(this.host + 'docs/raschetsave', ras4et)
  }

  period_pokazatel_detail(body: any) {
    return this.http.post(this.host + 'dirs/period_pokazdetail', body)
  }




  //   deleteCategory(category_id: number = 0) {
  //     return this.http.delete(this.host + `dirs/categorydelete/${category_id}`)
  // }


}
