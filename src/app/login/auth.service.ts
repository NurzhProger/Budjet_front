import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User, body } from "./interfaces";

@Injectable({
    providedIn: 'root'
})


export class AuthService {

    constructor(
        private http: HttpClient) { }

    private auth_token = ''
    host = "http://192.168.10.200:9999/"
    // host = "http://192.168.5.27:9999/"
    // host = "https://planback.qazna24.kz/"





    login(user: User): Observable<{ auth_token: string }> {

        return this.http.post<{ auth_token: string }>
            (this.host + 'api/auth/token/login', user)
            .pipe(
                tap(
                    ({ auth_token }) => {
                        sessionStorage.setItem('auth-token', auth_token)
                        this.setToken(auth_token)
                    }
                )
            )
    }

    clearToken(body: body) {

        let temp_token = 'Basic ' + btoa(unescape(encodeURIComponent(body.username + ":" + body.password)))
        sessionStorage.setItem('temp-token', temp_token)

        let myHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', temp_token);
        return this.http.get(this.host + "dirs/cleartoken", { headers: myHeaders })
    }

    setToken(token: string) {
        this.auth_token = token
    }

    setStorageToken() {
        sessionStorage.setItem('auth-token', '')
    }

    getToken(): string {
        return sessionStorage.getItem('auth-token') || ''
    }

    isAuthenticated(): boolean {
        return this.auth_token != ''
    }

    logout(): Observable<any> {
        return this.http.post<any>
            (this.host + 'api/auth/token/logout', {})
            .pipe(
                tap(
                    () => {
                        sessionStorage.clear()
                        this.auth_token = ''
                    }
                )
            )
    }

}