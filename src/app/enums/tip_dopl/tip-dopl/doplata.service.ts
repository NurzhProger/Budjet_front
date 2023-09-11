import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  doplata_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoplataService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(): Observable<doplata_list> {
      return this.http.get<doplata_list>(this.host + 'enums/tip_dopllist')
  }

}