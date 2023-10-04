import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { regions__element, regions_list } from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export default class RegionsService {


  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }


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