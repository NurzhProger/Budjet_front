import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/login/auth.service"
import { password } from "./changepass.interface";

@Injectable({
    providedIn: 'root'
})


export class changePassService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    getChangePassFromLogin(body: password) {
        let temp_token = sessionStorage.getItem('temp-token') || ''

        let myHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', temp_token)
        return this.http.post(this.host + 'dirs/changepass', body, { headers: myHeaders })
    }

    getChangePassFromStartPage(body: password) {
        return this.http.post(this.host + 'dirs/changepass', body)
    }
}