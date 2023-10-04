import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { func_podgroup_detail, func_podgroup_list } from "./interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class FuncPodgroupService {

    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<func_podgroup_list> {
        return this.http.get<func_podgroup_list>(this.host + 'dirs/funcpodgrouplist', { params })
    }

    add(params: any): Observable<func_podgroup_list> {
        return this.http.get<func_podgroup_list>(this.host + 'dirs/funcpodgrouplist', { params })
    }


}
