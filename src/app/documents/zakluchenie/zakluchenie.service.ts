import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zakluchenie_detail, zakluchenie_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ZakluchenieService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<zakluchenie_list> {
    return this.http.get<zakluchenie_list>(this.host + 'docs/zakluchenie_list', { params })
  }

  fetch_detail(zakluchenie_id: string): Observable<zakluchenie_detail> {
    return this.http.get<zakluchenie_detail>(this.host + 'docs/zakluchenie_item/' + zakluchenie_id)
  }

  save(limit: zakluchenie_detail) {
    return this.http.post(this.host + 'docs/zakluchenie_save', limit)
  }

  // edit(param: limit_doc) {
  //   return this.http.post(this.host + 'docs/oblasti_regedit', param)
  // }
  del(limit_id: number = 0) {
    return this.http.delete(this.host + `docs/zakluchenie_delete/${limit_id}`)
  }

}