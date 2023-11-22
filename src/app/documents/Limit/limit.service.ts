import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { limit_detail, limit_doc, limit_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LimitService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<limit_list> {
    return this.http.get<limit_list>(this.host + 'docs/limit_planlist', { params })
  }

  fetch_detail(limit_id: string): Observable<limit_detail> {
    return this.http.get<limit_detail>(this.host + 'docs/limit_planitem/' + limit_id)
  }

  saveLimit(limit: limit_detail) {
    return this.http.post(this.host + 'docs/limit_plansave', limit)
  }

  edit(param: limit_doc) {
    return this.http.post(this.host + 'docs/oblasti_regedit', param)
  }
  delLimit(limit_id: number = 0) {
    return this.http.delete(this.host + `docs/limit_plandelete/${limit_id}`)
}

}