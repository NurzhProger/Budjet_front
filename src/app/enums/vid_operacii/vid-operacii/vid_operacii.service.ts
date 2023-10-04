import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_operacii } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VidOperaciiService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<vid_operacii> {
    return this.http.get<vid_operacii>(this.host + 'enums/vid_operaciilist')
  }

}