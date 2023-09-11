import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { podclass_interfaces , podclass_interfaces_detail} from "./podclass_interfaces";

@Injectable({
    providedIn: 'root'
})


export class podclassService {
    constructor(private http: HttpClient) {
    }
    host = "http://192.168.5.27:9999/"


    fetch(params: any): Observable<podclass_interfaces> {
        return this.http.get<podclass_interfaces>(this.host + 'dirs/podclasslist', { params })
    }

    savepodclass(param: podclass_interfaces_detail) {
      return this.http.post(this.host + 'dirs/podclassedit', param)
    }

    addpodclass(param: podclass_interfaces_detail) {
        return this.http.post(this.host + 'dirs/podclassadd', param)
    }
}
