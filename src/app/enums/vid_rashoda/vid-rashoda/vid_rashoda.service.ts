import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_rashoda } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VidRashodaService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(): Observable<vid_rashoda> {
      return this.http.get<vid_rashoda>(this.host + 'enums/vid_rashodalist')
  }

}