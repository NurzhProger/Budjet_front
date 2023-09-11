import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Budjet_list , Budjet_detail} from '../budjet/interfaces';


@Injectable({
    providedIn: 'root'
})


export class Budjet_Service {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<Budjet_list> {
        return this.http.get<Budjet_list>(this.host + 'dirs/budjetlist', { params })
    }
}
