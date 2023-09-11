import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { classsification_income_detail, classsification_income_list, classsification_income } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class ClassificationIncomeService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<classsification_income_list> {
        return this.http.get<classsification_income_list>(this.host + 'dirs/classificationinclist', { params })
    }

    fetch_detail(classif_inc_id: number): Observable<classsification_income_detail> {
        return this.http.get<classsification_income_detail>(this.host + `dirs/classificationincitem/${classif_inc_id}`)
    }

    saveClass(classif_inc: classsification_income_detail) {
        return this.http.post(this.host + 'dirs/classificationincedit', classif_inc)
    }

    addClass(classif_inc: classsification_income_detail) {
        return this.http.post(this.host + 'dirs/classificationincadd', classif_inc)
    }

    deleteClass(classif_inc_id: number) {
        return this.http.delete(this.host + `dirs/classificationincdelete/${classif_inc_id}`)
    }
}