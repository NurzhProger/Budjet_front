import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService,SelectItem  } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Budget_detail,budget_list_doc } from "../budget_request.interfaces";
import { budjetService } from '../budget_request.servise'
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-budget-request-detail',
  templateUrl: './budget-request-detail.component.html',
  styleUrls: ['./budget-request-detail.component.css']
})
export class BudgetRequestDetailComponent implements OnInit {

  constructor(
    private Budget_detail_ryref: DynamicDialogRef,
    private Budget_detail_messageServicedelSelect: MessageService,
    private Budget_detail_dialog: DialogService,
    private Budget_Servise:budjetService,
    private Budget_Confirmation:ConfirmationService)  { }


  @Input() Budget_doc_id = ''
  @Output() closeEvent = new EventEmitter<any>();

  items: MenuItem[];
  form: FormGroup
  hashBegin = ''
  hashEnd = ''
  statuses!: SelectItem[];

  Budget_detail: Budget_detail = {
    doc: {
      id: 0,
      org_name: "",
      _organization: 0,
      _date: "",
      nom:"",
      god_ucheta: "",
      _vid_dannyh: "",
      _vid_operacii: "",
      deleted: false,
    },
    tbl: [{
      id: 0,
      _planirovanie: 0,
      summ: 0,
      _fkr: 0,
      fkrname: "",
      fkrcode: "",
      _spec: 0,
      specname: "",
      speccode: "",
      _form: 0,
      formname: "",
      formhead: ""
    }]
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null, [Validators.required]),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required])
    })


    if (this.Budget_doc_id !== '') {
      console.log(this.Budget_doc_id)
      this.Budget_Servise.fetch_detail(this.Budget_doc_id)
        .subscribe(
          (detail) => {
            this.Budget_detail = detail
            console.log(this.Budget_detail)
            let objString = JSON.stringify(this.Budget_detail)
            this.hashBegin = SHA256(objString).toString()
          }
        )
    }
    else {
      this.Budget_detail = {
        doc: {
          id: 0,
          org_name: "",
          _organization: 0,
          _date: "",
          nom:"",
          god_ucheta: "",
          _vid_dannyh: "",
          _vid_operacii: "",
          deleted: false,
        },
        tbl: [{
          id: 0,
          _planirovanie: 0,
          summ: 0,
          _fkr: 0,
          fkrname: "",
          fkrcode: "",
          _spec: 0,
          specname: "",
          speccode: "",
          _form: 0,
          formname: "",
          formhead: ""
        }]
      }


    }

  }



  saveDoc(set:boolean){

  }
  closeform(set:boolean){

  }

  selectspec(){

  }

  add_tbl(){

  }


  viewspec(){

  }

  add_dopl(){

  }

  deleted_tbl(index:number){

  }

  deleted_dopl(index:number){

  }


  viewOrg(){

  }

  selectOrg(){

  }

  changedate() {
    this.Budget_detail.doc._date = this.toLocaleDate(this.Budget_detail.doc._date)
  }

  toLocaleDate(dateForStr: string) {
    return new Date(dateForStr).toLocaleDateString() + ' ' + new Date(dateForStr).toLocaleTimeString();
  }





}
