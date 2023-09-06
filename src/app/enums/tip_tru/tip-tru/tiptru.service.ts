import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tip_tru_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipTruService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(): Observable<tip_tru_list> {
      return this.http.get<tip_tru_list>(this.host + 'enums/tip_trulist')
  }

}