import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { func_group_detail, func_group_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class FuncGroupService {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<func_group_list> {
        return this.http.get<func_group_list>(this.host + 'dirs/funcgrouplist', { params })
    }

    add(param: func_group_detail) {
        return this.http.post(this.host + 'dirs/funcgrouplist', param)
    }
}
