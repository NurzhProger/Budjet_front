import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doplata_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoplataService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<doplata_list> {
    return this.http.get<doplata_list>(this.host + 'enums/tip_dopllist')
  }

}