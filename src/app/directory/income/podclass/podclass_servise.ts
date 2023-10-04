import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { podclass_interfaces, podclass_interfaces_detail } from "./podclass_interfaces";
import { AuthService } from "src/app/login/auth.service";

@Injectable({
    providedIn: 'root'
})


export class podclassService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }


    fetch(params: any): Observable<podclass_interfaces> {
        return this.http.get<podclass_interfaces>(this.host + 'dirs/podclasslist', { params })
    }

    savepodclass(param: podclass_interfaces_detail) {
        return this.http.post(this.host + 'dirs/podclassedit', param)
    }

    addpodclass(param: podclass_interfaces_detail) {
        return this.http.post(this.host + 'dirs/podclassadd', param)
    }
}
