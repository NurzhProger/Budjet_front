import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { abp_detail, abp_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class abpService {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<abp_list> {
        return this.http.get<abp_list>(this.host + 'dirs/abplist', { params })
    }

}