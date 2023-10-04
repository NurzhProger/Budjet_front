import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/login/auth.service";





@Injectable({
  providedIn: 'root'
})


export class import219Servise {


  // host = "http://192.168.5.27:8000/"
  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }

  send_file(body: any) {
    console.log(body)
    return this.http.post(this.host + "docs/import219", JSON.stringify(body))
  }
}
