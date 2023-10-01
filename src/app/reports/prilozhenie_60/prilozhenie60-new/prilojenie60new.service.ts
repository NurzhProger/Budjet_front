import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Prilozhenie60NewService {

    host = "http://192.168.5.27:9999/"

    constructor(
        private http: HttpClient,
        ) {}


    getReport(params: any) {
        return this.http.post(this.host + "reports/prilozhenie60", params, { responseType: 'blob'})
    }

}