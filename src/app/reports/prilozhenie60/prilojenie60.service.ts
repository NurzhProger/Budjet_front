import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prilozhenie60 } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
    providedIn: 'root'
})
export class Prilozhenie60Service {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    form(): Observable<Prilozhenie60> {
        return this.http.get<Prilozhenie60>(this.host + 'reports/prilozhenie60')
    }

}