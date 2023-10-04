import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { marki_avto_element, marki_avto_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarkiAvtoService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


  fetch(params: any): Observable<marki_avto_list> {
    return this.http.get<marki_avto_list>(this.host + 'dirs/marki_avtolist', { params })
  }

  fetchMarkiAvto(markiavto_id: number): Observable<marki_avto_element> {
    return this.http.get<marki_avto_element>(this.host + `dirs/marki_avtoitem/${markiavto_id}`)
  }

  add(param: marki_avto_element) {
    return this.http.post(this.host + 'dirs/marki_avtoadd', param)
  }

  edit(param: marki_avto_element) {
    return this.http.post(this.host + 'dirs/marki_avtoedit', param)
  }
}
