import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { budget_list, budget_list_doc,Budget_detail } from "./budget_request.interfaces";


@Injectable({
    providedIn: 'root'
})


export class budjetService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"

    fetch(params: any): Observable<budget_list> {
      return this.http.get<budget_list>(this.host + 'docs/planirovanie_list', { params })
    }

    fetch_detail(form_id: string): Observable<Budget_detail> {
      return this.http.get<Budget_detail>(this.host + 'docs/planirovanie_item/' + form_id)
    }




  //   deleteCategory(category_id: number = 0) {
  //     return this.http.delete(this.host + `dirs/categorydelete/${category_id}`)
  // }


}
