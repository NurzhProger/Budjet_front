import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { budget_list, budjet_detail } from "./budget_request.interfaces";
import { vid_rashoda } from "src/app/enums/vid_rashoda/vid-rashoda/interfaces";


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

    fetch_detail(form_id: string): Observable<budjet_detail> {
      return this.http.get<budjet_detail>(this.host + 'docs/planirovanie_item/' + form_id)
    }

    fetch_vid_rashoda(): Observable<vid_rashoda> {
      return this.http.get<vid_rashoda>(this.host + 'enums/vid_rashodalist')
    }


  //   deleteCategory(category_id: number = 0) {
  //     return this.http.delete(this.host + `dirs/categorydelete/${category_id}`)
  // }


}
