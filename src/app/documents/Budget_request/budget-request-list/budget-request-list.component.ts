import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MessageService,ConfirmationService } from 'primeng/api';
import { budjetService } from '../budget_request.servise'
import { budget_list, budjet_doc } from '../budget_request.interfaces';

@Component({
  selector: 'app-budget-request-list',
  templateUrl: './budget-request-list.component.html',
  styleUrls: ['./budget-request-list.component.css']
})
export class BudgetRequestListComponent implements OnInit {




  constructor(
    private budget_list_ryref: DynamicDialogRef,
    private budget_list_messageServicedelSelect: MessageService,
    private budget_list_dialog: DialogService,
    private budget_Servise: budjetService,
    private budget_confrim:ConfirmationService)  { }




  @Output() closeEvent = new EventEmitter<any>()
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() data = false
  Budget_list$: Observable<budget_list>
  first = 0
  rows = 25
  last = 3
  searcforms = ""
  windowHeight: number
  selected: any


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
    this.newItemEvent.emit({ params: { selector: 'app-budget-request-detail', nomer: 'Шаблон формы ', id: '' } });
  }

  onSelected(){

  }

  closeform(){
    this.closeEvent.emit()
  }



  onDelete() {

  }

  onRowEdit(budjet: budjet_doc){

    this.newItemEvent.emit({ params: { selector: 'app-budget-request-detail', nomer: 'Бюджетная заявка ' + budjet.nom, id: budjet.id } });


  }

  onRowClick(budjet: budjet_doc){
    if (this.data) {
      this.onRowEdit(budjet)
    }
    else {
      this.budget_list_ryref.close(budjet)
    }
  }
  

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchCat()
  }

}