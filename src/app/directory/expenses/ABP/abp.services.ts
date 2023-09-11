import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { abp_detail, abp_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class abpService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<abp_list> {
        return this.http.get<abp_list>(this.host + 'dirs/abplist', { params })
    }

}