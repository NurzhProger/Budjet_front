import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/login/auth.service"
import { user_detail, user_list } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class UsersService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<user_list> {
        return this.http.get<user_list>(this.host + 'dirs/userlist', { params })
    }

    fetchUser(user_id: number): Observable<user_detail> {
        return this.http.get<user_detail>(this.host + `dirs/useritem/${user_id}`)
    }

    saveUser(user_detail: user_detail) {
        return this.http.post(this.host + 'dirs/usersave', user_detail)
    }

    // parent_organization_add(params: params_org) {
    //     return this.http.post(this.host + 'dirs/parent_organization_add', params)
    // }

    // parent_organization_del(id: number) {
    //     return this.http.delete(this.host + `dirs/parent_organization_del/${id}`)
    // }
}
