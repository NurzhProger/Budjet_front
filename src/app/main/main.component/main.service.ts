import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/login/auth.service"
import { profileuser } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class MainService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    getinfo(): Observable<profileuser> {
        return this.http.get<profileuser>(this.host + 'dirs/getinfo')
    }
}