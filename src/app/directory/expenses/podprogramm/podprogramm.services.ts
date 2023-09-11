import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { podprogramm_detail, podprogramm_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class podprogrammService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<podprogramm_list> {
        return this.http.get<podprogramm_list>(this.host + 'dirs/podprogramlist', { params })
    }

}