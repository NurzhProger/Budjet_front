import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { form_list, form_list_doc,form_detail } from "./forms_interfaces";

@Injectable({
    providedIn: 'root'
})


export class formsService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<form_list> {
        return this.http.get<form_list>(this.host + 'dirs/formslist', { params })
    }

    fetch_detail(form_id: string): Observable<form_detail> {
      return this.http.get<form_detail>(this.host + 'dirs/formsitem/' + form_id)
    }

    saveforms(utv_inc: form_detail) {
      return this.http.post(this.host + 'dirs/formsedit', utv_inc)
  }


}
