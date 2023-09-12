import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { budget_list, budget_list_doc } from "../budget_request.interfaces";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MessageService,ConfirmationService } from 'primeng/api';
import { formsService } from '../budget_request.servise'

@Component({
  selector: 'app-budget-request-list',
  templateUrl: './budget-request-list.component.html',
  styleUrls: ['./budget-request-list.component.css']
})
export class BudgetRequestListComponent implements OnInit {

  Budget_list$: Observable<budget_list>
  first = 0
  rows = 25
  last = 3
  searcforms = ""
  windowHeight: number
  selected: any


  constructor(
    private budget_list_ryref: DynamicDialogRef,
    private budget_list_messageServicedelSelect: MessageService,
    private budget_list_dialog: DialogService,
    private budget_Servise:formsService,
    private budget_confrim:ConfirmationService)  { }




  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false


  ngOnInit(): void {
    this.fetchCat()
  }

  fetchCat() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searcforms.toString()
    }

    this.Budget_list$ = this.budget_Servise.fetch(params)
  }


  openNew(){

  }

  onSelected(){

  }

  closeform(){

    this.closeEvent.emit()

  }

  onRowClick(form_doc: budget_list_doc){

  }

  onDelete(cat: budget_list_doc) {

  }

  onRowEdit(form_doc: budget_list_doc){


  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchCat()
  }

}
