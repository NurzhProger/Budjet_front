import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prilozhenie60 } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Prilozhenie60Service {

    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    form(): Observable<Prilozhenie60> {
        return this.http.get<Prilozhenie60>(this.host + 'reports/prilozhenie60')
    }

}