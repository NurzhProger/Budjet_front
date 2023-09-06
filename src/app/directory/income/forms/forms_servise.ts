import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { form_list, form_list_doc } from "./forms_interfaces";

@Injectable({
    providedIn: 'root'
})


export class formsService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.10.200:9999/"


    fetch(params: any): Observable<form_list> {
        return this.http.get<form_list>(this.host + 'dirs/formslist', { params })
    }

}
