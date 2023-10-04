import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { class_income_detail, class_income_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class ClassIncomeService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<class_income_list> {
        return this.http.get<class_income_list>(this.host + 'dirs/classlist', { params })
    }

    saveClass(class_inc: class_income_detail) {
        return this.http.post(this.host + 'dirs/classedit', class_inc)
    }

    addClass(class_inc: class_income_detail) {
        return this.http.post(this.host + 'dirs/classadd', class_inc)
    }

    deleteClass(class_inc_id: number = 0) {
        return this.http.delete(this.host + 'dirs/classdelete/' + class_inc_id)
    }
}