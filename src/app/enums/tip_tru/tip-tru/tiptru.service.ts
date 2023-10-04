import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tip_tru_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipTruService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<tip_tru_list> {
    return this.http.get<tip_tru_list>(this.host + 'enums/tip_trulist')
  }

}