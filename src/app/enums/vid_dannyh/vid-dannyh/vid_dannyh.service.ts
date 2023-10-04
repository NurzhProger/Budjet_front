import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_dannyh } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VidDannyhService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<vid_dannyh> {
    return this.http.get<vid_dannyh>(this.host + 'enums/vid_dannyhlist')
  }

}