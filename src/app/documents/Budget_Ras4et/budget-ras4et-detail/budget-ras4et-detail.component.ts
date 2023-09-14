import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService ,MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError, timeout } from 'rxjs'
import { Ras4et_doc,ChildItem } from "../Budget_ras4et.interfaces";
import { budjetRas4et_Service } from "../Budget_ras4et.Services";

@Component({
  selector: 'app-budget-ras4et-detail',
  templateUrl: './budget-ras4et-detail.component.html',
  styleUrls: ['./budget-ras4et-detail.component.css']
})
export class BudgetRas4etDetailComponent implements OnInit {

  constructor(
    private Budget_ras4et_Service: budjetRas4et_Service,
    private Budget_ras4et_Detailconfig: DynamicDialogConfig,
    private Budget_ras4et_Detailmsg: MessageService,
    private Budget_ras4et_Detailref: DynamicDialogRef,) { }


  form: FormGroup
  items: MenuItem[];
  Ras4et_detail: Ras4et_doc
  formaid = ""
  colum = 0

  ngOnInit(): void {
    this.form = new FormGroup({
      name_doc: new FormControl(null, [Validators.required]),
      fkr_name: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required])
    })


    this.formaid = this.Budget_ras4et_Detailconfig.data.formaid

    if (this.formaid !== "") {
      this.Budget_ras4et_Service.fetch_detail(this.formaid)
        .subscribe(
          (data) => (
              this.Ras4et_detail = data,
              this.colum = this.Ras4et_detail.tbl.length,
              console.log(this.colum)


            )
        )
    }
    // for (var val of this.Ras4et_detail.tbl[0].children) {
    //   console.log(val); // prints values: 10, 20, 30, 40
    // }


    // this.Ras4et_detail.tbl.forEach((item) => {
    //   console.log(item)

    // });



  }


  saveDoc(step:boolean){

  }

  closeform(step:boolean){

  }
  viewsfkr(){

  }

  selectfkr(){

  }

  add_tbl(){}

}
