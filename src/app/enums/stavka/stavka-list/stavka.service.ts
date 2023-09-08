import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stavka_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StavkaService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(): Observable<stavka_list> {
      return this.http.get<stavka_list>(this.host + 'enums/stavkilist')
  }

}