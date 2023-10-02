import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Prilozhenie5758Service {

    host = "http://192.168.5.27:9999/"

    constructor(
        private http: HttpClient,
        ) {}


    getReport57(params: any) {
        return this.http.post(this.host + "reports/prilozhenie57", params, { responseType: 'blob'})
    }

    getReport58(params: any) {
        return this.http.post(this.host + "reports/prilozhenie58", params, { responseType: 'blob'})
    }

}