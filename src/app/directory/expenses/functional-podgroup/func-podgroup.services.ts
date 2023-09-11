import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { func_podgroup_detail, func_podgroup_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class FuncPodgroupService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<func_podgroup_list> {
        return this.http.get<func_podgroup_list>(this.host + 'dirs/funcpodgrouplist', { params })
    }

    add(params: any): Observable<func_podgroup_list> {
        return this.http.get<func_podgroup_list>(this.host + 'dirs/funcpodgrouplist', { params })
    }


}
