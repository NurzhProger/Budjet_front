import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dolzhnost_element, dolzhnost_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolzhnostService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.5.27:9999/"


  fetch(params: any): Observable<dolzhnost_list> {
      return this.http.get<dolzhnost_list>(this.host + 'dirs/dolzhnostlist', { params })
  }

  fetchDolzhnost(dolzhnost_id: number): Observable<dolzhnost_element> {
    
      return this.http.get<dolzhnost_element>(this.host + `dirs/dolzhnostitem/${dolzhnost_id}`)
  }

  add(param: dolzhnost_element) {
      return this.http.post(this.host + 'dirs/dolzhnostadd', param)
  }

  edit(param: dolzhnost_element) {
    return this.http.post(this.host + 'dirs/dolzhnostedit', param)
  }
}