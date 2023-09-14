import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ras4et_doc } from "./Budget_ras4et.interfaces";


@Injectable({
    providedIn: 'root'
})


export class budjetRas4et_Service {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch_detail(form_id: string): Observable<Ras4et_doc> {
      return this.http.get<Ras4et_doc>(this.host + 'docs/raschetitem/' + "1")
    }




  //   deleteCategory(category_id: number = 0) {
  //     return this.http.delete(this.host + `dirs/categorydelete/${category_id}`)
  // }


}
