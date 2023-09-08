import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { regions__element, regions_list } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class RegionsService {

  constructor(private http: HttpClient) {
  }
  host = "http://192.168.10.200:9999/"


  fetch(params: any): Observable<regions_list> {
      return this.http.get<regions_list>(this.host + 'dirs/regiondarlist', { params })
  }

  fetchRegion(regions_id: number): Observable<regions__element> {
      return this.http.get<regions__element>(this.host + `dirs/regiondaritem/${regions_id}`)
  }

  add(param: regions__element) {
      return this.http.post(this.host + 'dirs/reiondaradd', param)
  }

  edit(param: regions__element) {
    return this.http.post(this.host + 'dirs/reiondaredit', param)
  }
}