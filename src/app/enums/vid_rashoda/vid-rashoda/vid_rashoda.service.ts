import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vid_rashoda } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VidRashodaService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(): Observable<vid_rashoda> {
    return this.http.get<vid_rashoda>(this.host + 'enums/vid_rashodalist')
  }

}