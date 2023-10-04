import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Budjet_list, Budjet_detail } from '../budjet/interfaces';
import { AuthService } from "src/app/login/auth.service";


@Injectable({
    providedIn: 'root'
})


export class Budjet_Service {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<Budjet_list> {
        return this.http.get<Budjet_list>(this.host + 'dirs/budjetlist', { params })
    }
}
