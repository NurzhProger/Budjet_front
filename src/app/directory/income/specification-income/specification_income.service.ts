import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { specification_income_detail, specification_income_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class SpecificationIncomeService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<specification_income_list> {
        return this.http.get<specification_income_list>(this.host + 'dirs/specinclist', { params })
    }

    fetchid(id: number): Observable<specification_income_detail> {
        return this.http.get<specification_income_detail>(this.host + `dirs/specincitem/${id}`)
    }

    saveSpec(spec: specification_income_detail) {
        return this.http.post(this.host + 'dirs/specincedit', spec)
    }

    addSpec(spec: specification_income_detail) {
        return this.http.post(this.host + 'dirs/specincadd', spec)
    }

    deleteSpec(spec_id: number) {
        return this.http.delete(this.host + 'dirs/specincdelete/' + spec_id)
    }
}
