import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { vid_rashoda } from "src/app/enums/vid_rashoda/vid-rashoda/interfaces";
import { vid_dannyh } from "src/app/enums/vid_dannyh/vid-dannyh/interfaces";
import { vid_operacii } from "src/app/enums/vid_operacii/vid-operacii/interfaces";
import { AuthService } from "src/app/login/auth.service";
import { budget_income_detail, budget_income_list } from "./budget_income_interfaces";


@Injectable({
  providedIn: 'root'
})


export class BudgetIncomeService {

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
  
  fetch(params: any): Observable<budget_income_list> {
    return this.http.get<budget_income_list>(this.host + 'docs/budjet_income_list', { params })
  }

  fetch_detail(budget_inc_id: string): Observable<budget_income_detail> {
    return this.http.get<budget_income_detail>(this.host + 'docs/budjet_income_item/' + budget_inc_id)
  }

//   fetch_vid_rashoda(): Observable<vid_rashoda> {
//     return this.http.get<vid_rashoda>(this.host + 'enums/vid_rashodalist')
//   }

//   fetch_vid_dannyh(): Observable<vid_dannyh> {
//     return this.http.get<vid_dannyh>(this.host + 'enums/vid_dannyhlist')
//   }

//   fetch_vid_oparecii(): Observable<vid_operacii> {
//     return this.http.get<vid_operacii>(this.host + 'enums/vid_operaciilist')
//   }

  saveInc(budjet: budget_income_detail) {
    return this.http.post(this.host + 'docs/budjet_income_save', budjet)
  }


deleteInc(item_id: number = 0) {
    return this.http.delete(this.host + `docs/budjet_income_delete/${item_id}`)
  }


}
