import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";





@Injectable({
  providedIn: 'root'
})


export class import219Servise {

  constructor(private http: HttpClient) {
  }
  // host = "http://192.168.5.27:8000/"
  host = "http://192.168.5.27:9999/"

  send_file(body: any) {
    console.log(body)
    return this.http.post(this.host + "docs/import219", JSON.stringify(body))
  }
}
