import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { category_income_detail, category_income_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class CategoryIncomeService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<category_income_list> {
        return this.http.get<category_income_list>(this.host + 'dirs/categorylist', { params })
    }

    fetch_detail(category_id: number): Observable<category_income_detail> {
        return this.http.get<category_income_detail>(this.host + `dirs/categoryitem/${category_id}`)
    }

    saveCategory(category: category_income_detail) {
        return this.http.post(this.host + 'dirs/categoryedit', category)
    }

    addCategory(category: category_income_detail) {
        return this.http.post(this.host + 'dirs/categoryadd', category)
    }

    deleteCategory(category_id: number = 0) {
        return this.http.delete(this.host + `dirs/categorydelete/${category_id}`)
    }
}