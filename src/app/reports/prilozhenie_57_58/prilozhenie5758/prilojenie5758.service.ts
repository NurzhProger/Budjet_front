import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
    providedIn: 'root'
})
export class Prilozhenie5758Service {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }




    getReport57(params: any) {
        return this.http.post(this.host + "reports/prilozhenie57", params )
    }

    getReport58(params: any) {
        return this.http.post(this.host + "reports/prilozhenie58", params, { responseType: 'blob' })
    }

}