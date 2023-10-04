import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stavka_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StavkaService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<stavka_list> {
    return this.http.get<stavka_list>(this.host + 'enums/stavkilist')
  }

}