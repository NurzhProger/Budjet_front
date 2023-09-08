import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tip_topliva_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipToplivaService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(): Observable<tip_topliva_list> {
      return this.http.get<tip_topliva_list>(this.host + 'enums/tip_toplivalist')
  }

}