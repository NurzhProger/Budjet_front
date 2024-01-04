import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { podprogramm_detail, podprogramm_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class podprogrammService {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<podprogramm_list> {
        return this.http.post<podprogramm_list>(this.host + 'dirs/podprogramlist', params)
    }

}