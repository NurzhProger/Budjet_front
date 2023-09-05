import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { specification_expenses_detail, specification_expenses_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class SpecificationExpensesService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:8000/"


    fetch(params: any): Observable<specification_expenses_list> {
        return this.http.get<specification_expenses_list>(this.host + 'dirs/specexplist', { params })
    }

    saveSpec(spec: specification_expenses_detail) {
        return this.http.post(this.host + 'dirs/specincedit', spec)
    }

    addSpec(spec: specification_expenses_detail) {
        return this.http.post(this.host + 'dirs/specincadd', spec)
    }

    deleteSpec(spec_id: number) {
        return this.http.delete(this.host + 'dirs/specincdelete/' + spec_id)
    }
}