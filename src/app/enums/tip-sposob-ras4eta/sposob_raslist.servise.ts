import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sposob_ras4eta_list } from './sposob_raslist.interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Sposob_ras4eta_servise {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<Sposob_ras4eta_list> {
    return this.http.get<Sposob_ras4eta_list>(this.host + 'enums/sposob_raslist')
  }

}
