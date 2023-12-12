import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { budget_list, budjet_detail } from "./budget_request.interfaces";
import { vid_rashoda } from "src/app/enums/vid_rashoda/vid-rashoda/interfaces";
import { vid_dannyh } from "src/app/enums/vid_dannyh/vid-dannyh/interfaces";
import { vid_operacii } from "src/app/enums/vid_operacii/vid-operacii/interfaces";
import { AuthService } from "src/app/login/auth.service";


@Injectable({
  providedIn: 'root'
})


export class budjetService {

  host = ""

  constructor(
    private http: HttpClient,
    private authservice: AuthService) {
    this.host = this.authservice.host;
  }

  gettablexls(id: string = '') {

    return this.http.get(this.host + 'reports/pechatnaya_excell/' + id, { responseType: 'blob' })
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'Выгрузка.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  fetch(params: any): Observable<budget_list> {
    return this.http.get<budget_list>(this.host + 'docs/planirovanie_list', { params })
  }
  fetchOtbor(params: any): Observable<budget_list> {
    return this.http.get<budget_list>(this.host + 'docs/planirovanie_list', { params })
  }

  fetch_detail(form_id: string): Observable<budjet_detail> {
    return this.http.get<budjet_detail>(this.host + 'docs/planirovanie_item/' + form_id)
  }

  fetch_vid_rashoda(): Observable<vid_rashoda> {
    return this.http.get<vid_rashoda>(this.host + 'enums/vid_rashodalist')
  }

  fetch_vid_dannyh(): Observable<vid_dannyh> {
    return this.http.get<vid_dannyh>(this.host + 'enums/vid_dannyhlist')
  }

  fetch_vid_oparecii(): Observable<vid_operacii> {
    return this.http.get<vid_operacii>(this.host + 'enums/vid_operaciilist')
  }

  saveLimit(budjet: budjet_detail) {
    return this.http.post(this.host + 'docs/planirovanie_save', budjet)
  }


  deleteReq(item_id: number = 0) {
    return this.http.delete(this.host + `docs/planirovanie_delete/${item_id}`)
}

del_Past() {
  return this.http.delete(this.host + 'docs/planirovanie_del_pust')
}


}
