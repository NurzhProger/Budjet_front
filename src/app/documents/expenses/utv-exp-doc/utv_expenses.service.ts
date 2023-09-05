import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { utv_expenses_detail, utv_expenses_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class UtvExpensesService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:8000/"


    fetch(params: any): Observable<utv_expenses_list> {
        return this.http.get<utv_expenses_list>(this.host + 'docs/utvexplist', { params })
    }

    fetch_detail(utv_exp_id: number): Observable<utv_expenses_detail> {
        return this.http.get<utv_expenses_detail>(this.host + `docs/utvexpitem/${utv_exp_id}`)
    }

    saveUtv(utv_inc: utv_expenses_detail) {
        return this.http.post(this.host + 'docs/utvexpsave', utv_inc)
    }

    deleteUtv(utv_inc_id: number = 0) {
        return this.http.delete(this.host + `docs/utvexpdelete/${utv_inc_id}`)
    }
}