import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { programm_detail, programm_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class programmService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<programm_list> {
        return this.http.get<programm_list>(this.host + 'dirs/programlist', { params })
    }

}