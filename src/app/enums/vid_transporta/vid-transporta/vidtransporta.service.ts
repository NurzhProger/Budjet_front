import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_transporta_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VidTransportaService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(): Observable<vid_transporta_list> {
      return this.http.get<vid_transporta_list>(this.host + 'enums/vid_transportalist')
  }

}