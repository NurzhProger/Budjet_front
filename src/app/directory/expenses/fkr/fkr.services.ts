import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { fkr_detail, fkr_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class fkrService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:8000/"


    fetch(params: any): Observable<fkr_list> {
        return this.http.get<fkr_list>(this.host + 'dirs/fkrlist', { params })
    }

}