import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sposob_ras4eta_list } from './sposob_raslist.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sposob_ras4eta_servise {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(): Observable<Sposob_ras4eta_list> {
      return this.http.get<Sposob_ras4eta_list>(this.host + 'enums/sposob_raslist')
  }

}
