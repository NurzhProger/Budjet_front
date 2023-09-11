import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { form_list, form_list_doc } from "../forms_interfaces";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { formsService } from '../forms_servise'
@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.css']
})
export class FormlistComponent implements OnInit {

  constructor(
    private form_list_ryref: DynamicDialogRef,
    private form_list_messageServicedelSelect: MessageService,
    private form_list_dialog: DialogService,
    private form_Servise:formsService)  { }


  @Output() newItemEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  form_list$: Observable<form_list>
  searcforms = ''
  first = 0
  rows = 25
  last = 3
  selected: any
  windowHeight: number

  ngOnInit(): void {
    this.fetchCat()
  }

  fetchCat() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searcforms.toString()
    }

    this.form_list$ = this.form_Servise.fetch(params)
  }

  openNew(form_d: form_list_doc){
    this.newItemEvent.emit({ params: { selector: 'app-form-detail', nomer: 'Шаблон формы ', id: '' } });
  }

  onSelected(form_list: form_list_doc){

  }

  closeform(){

    this.closeEvent.emit()

  }

  onRowClick(form_doc: form_list_doc){
    console.log("dsd")
    this.newItemEvent.emit({ params: { selector: 'app-form-detail', nomer: 'Шаблон формы ' + form_doc.num_app, id: form_doc.id } });
  }



  onRowEdit(form_list: form_list_doc){

  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchCat()
  }

}
