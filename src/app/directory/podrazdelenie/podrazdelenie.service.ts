import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { podrazdelenie_element, podrazdelenie_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodrazdelenieService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(params: any): Observable<podrazdelenie_list> {
      return this.http.get<podrazdelenie_list>(this.host + 'dirs/podrazdelenielist', { params })
  }

  fetchStazh(podrazdelenie_id: number): Observable<podrazdelenie_element> {
      return this.http.get<podrazdelenie_element>(this.host + `dirs/podrazdelenieitem/${podrazdelenie_id}`)
  }

  add(param: podrazdelenie_element) {
    
      return this.http.post(this.host + 'dirs/podrazdelenieadd', param)
  }

  edit(param: podrazdelenie_element) {
    return this.http.post(this.host + 'dirs/podrazdelenieedit', param)
  }
}