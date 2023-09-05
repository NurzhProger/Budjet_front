import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class UserService {

    constructor(
        private http: HttpClient) { }

    private auth_token = ''
    // host = "http://127.0.0.1:8000/"
    host = "http://192.168.5.27:8000/"


    change_pass(password: string) {
        this.auth_token = password
    }



}
