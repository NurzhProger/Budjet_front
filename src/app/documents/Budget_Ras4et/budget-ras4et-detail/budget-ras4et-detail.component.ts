import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService ,MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError, timeout } from 'rxjs'
import { Ras4et_doc,ChildItem,TableItemPass } from "../Budget_ras4et.interfaces";
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
  Table:TableItemPass

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
              console.log(this.Ras4et_detail)



            )
        )
    }





    // this.Ras4et_detail.tbl.forEach((item) => {
    //   console.log(item)

    // });



  }


  conculate(){
    for (var stroka1 of this.Ras4et_detail.tbl) {
      this.Table.stroka = stroka1.stroka
      for (var item of stroka1.children){
        if (item.zn == "enstru"){
          this.dobavlenya("enstru",item.zn_enstru)
        }
      }


    }
  }

  dobavlenya(tip:string,doc:number){


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
