import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_operacii } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VidOperaciiService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(): Observable<vid_operacii> {
      return this.http.get<vid_operacii>(this.host + 'enums/vid_operaciilist')
  }

}