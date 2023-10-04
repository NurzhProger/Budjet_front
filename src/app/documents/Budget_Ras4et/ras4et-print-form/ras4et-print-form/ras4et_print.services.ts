import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/login/auth.service"

@Injectable({
    providedIn: 'root'
})

export class Ras4etPrintService {
    host = ""

    constructor(
        private http: HttpClient,
        private authservice: AuthService) {
        this.host = this.authservice.host;
    }



    getPrintForm(params: any) {
        return this.http.get(this.host + "reports/pechatnaya/" + params.id, { responseType: 'blob' })
    }
}