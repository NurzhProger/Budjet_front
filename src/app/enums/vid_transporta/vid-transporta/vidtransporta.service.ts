import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_transporta_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VidTransportaService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<vid_transporta_list> {
    return this.http.get<vid_transporta_list>(this.host + 'enums/vid_transportalist')
  }

}