import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/login/auth.service"

@Injectable({
    providedIn: 'root'
})

export class Ras4etPrintService {
    host = "http://192.168.5.27:9999/"

    constructor(
        private http: HttpClient,
        ) {}


    getPrintForm(params: any) {
        return this.http.get(this.host + "reports/pechatnaya/" + params.id, { responseType: 'blob'})
    }
}