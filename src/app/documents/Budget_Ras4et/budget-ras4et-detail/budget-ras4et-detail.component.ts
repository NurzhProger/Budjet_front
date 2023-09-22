import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, throwError, timeout } from 'rxjs'
import { EnstruListComponent } from 'src/app/directory/planirovanie/ensTRU/enstru-list/enstru-list.component';
import { ensTRU_element } from 'src/app/directory/planirovanie/ensTRU/interfaces';
import { Ras4et_doc, ChildItem, TableItemPass } from "../Budget_ras4et.interfaces";
import { budjetRas4et_Service } from "../Budget_ras4et.Services";
import { SHA256 } from 'crypto-js';

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
    private Budget_ras4et_Detailref: DynamicDialogRef,
    private Budget_ras4et_DialogService: DialogService,
    private Budget_Confirmation: ConfirmationService) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() ras_id: any
  @Input() form_id = ''
  form: FormGroup
  items: MenuItem[];
  Ras4et_detail: Ras4et_doc
  children: any = []
  column: any = []
  Table: TableItemPass
  hashBegin = ''
  hashEnd = ''
  spec_fullname = ''
  form_fullname = '' 
  ngOnInit(): void {
    this.form = new FormGroup({
      name_doc: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required])
    })

    // this.formaid = this.Budget_ras4et_Detailconfig.data.formaid
    console.log(this.ras_id);
    // console.log(this.form_id);
    
    if (this.ras_id !== "") {
      let params = {
        form: this.ras_id.form_id
      }
      
      
      this.Budget_ras4et_Service.fetch_detail(this.ras_id.ras_id, params)
        .subscribe(
          (data) => (
            this.Ras4et_detail = data,
            this.form_fullname = this.Ras4et_detail.head._form.name + ". " + this.Ras4et_detail.head._form.head_form,
            this.spec_fullname = this.Ras4et_detail.head._spec.code + ". " + this.Ras4et_detail.head._spec.name_rus,
            this.preob()
          )
        )
    }
  }

  preob() {
    for (let i = 0; this.Ras4et_detail.tbl.length > i; i++) {
      // for (let x = 0; this.Ras4et_detail.tbl[i].length > x; x++) {
      //   this.column.push(this.Ras4et_detail.tbl[i].children[x])
      // }
      this.children.push(this.Ras4et_detail.tbl[i])
    }
    console.log(this.children)

    this.column.push(this.Ras4et_detail.tbl[0])

  }

  selectENSTRU(ensTRU: ensTRU_element) {

    this.Budget_ras4et_Detailref = this.Budget_ras4et_DialogService.open(EnstruListComponent,
      {
        header: 'Выбор ЕНСТРУ',
        width: 'calc(60%)',
        height: 'calc(80%)'
      })
    this.Budget_ras4et_Detailref.onClose.subscribe((ensTRU_element: ensTRU_element) => {
      if (ensTRU_element) {
        ensTRU.name_rus = ensTRU_element.name_rus
        ensTRU.id = ensTRU_element.id
      }
    })
  }


  conculate() {
    // for (var stroka1 of this.Ras4et_detail.tbl) {
    //   this.Table.stroka = stroka1.stroka
    //   for (var item of stroka1.children) {
    //     if (item.zn == "enstru") {
    //       this.dobavlenya("enstru", item.zn_enstru)
    //     }
    //   }


    // }
  }

  dobavlenya(tip: string, doc: number) {


  }

  saveDoc(step: boolean) {

  }

  closeform(close: boolean) {
    let objString = JSON.stringify(this.Ras4et_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.Budget_Confirmation.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.Budget_Confirmation.close()
          },
          reject: () => {
            this.Budget_Confirmation.close()
          }
        })
      }
    }
  }
  viewsfkr() {

  }

  selectfkr() {

  }

  add_tbl() { }

}
