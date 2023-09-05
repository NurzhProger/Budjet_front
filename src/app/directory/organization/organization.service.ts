import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { organization_list, organization_detail } from "./interfaces";


@Injectable({
    providedIn: 'root'
})


export class OrganizationsService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.10.200:9999/"


    fetch(params: any): Observable<organization_list> {
        return this.http.get<organization_list>(this.host + 'dirs/organizationlist', { params })
    }

    fetchOrg(org_id: number): Observable<organization_detail> {
        return this.http.get<organization_detail>(this.host + `dirs/organizationitem/${org_id}`)
    }

    add(param: organization_detail) {
        return this.http.post(this.host + 'dirs/organizationsave', param)
    }
}
