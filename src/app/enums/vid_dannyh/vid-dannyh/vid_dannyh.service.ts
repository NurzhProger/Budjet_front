import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_dannyh } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VidDannyhService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(): Observable<vid_dannyh> {
      return this.http.get<vid_dannyh>(this.host + 'enums/vid_dannyhlist')
  }

}