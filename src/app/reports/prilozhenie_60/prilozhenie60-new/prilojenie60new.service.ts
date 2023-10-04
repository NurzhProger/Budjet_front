import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
    providedIn: 'root'
})
export class Prilozhenie60NewService {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }




    getReport(params: any) {
        return this.http.post(this.host + "reports/prilozhenie60", params, { responseType: 'blob' })
    }

}