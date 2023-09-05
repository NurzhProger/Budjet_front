import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { utv_income_detail, utv_income_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class UtvIncomeService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.10.200:9999/"


    fetch(params: any): Observable<utv_income_list> {
        return this.http.get<utv_income_list>(this.host + 'docs/utvinclist', { params })
    }

    fetch_detail(utv_inc_id: string): Observable<utv_income_detail> {
        return this.http.get<utv_income_detail>(this.host + 'docs/utvincitem/' + utv_inc_id)
    }

    saveUtv(utv_inc: utv_income_detail) {
        return this.http.post(this.host + 'docs/utvincsave', utv_inc)
    }

    deleteUtv(utv_inc_id: number = 0) {
        return this.http.delete(this.host + `docs/utvincdelete/${utv_inc_id}`)
    }
}