import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { budget_income_doc, budget_income_list } from '../budget_income_interfaces';
import { Observable } from 'rxjs';
import { BudgetIncomeService } from '../budget_income.servise';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-budget-income-list',
  templateUrl: './budget-income-list.component.html',
  styleUrls: ['./budget-income-list.component.css']
})
export class BudgetIncomeListComponent implements OnInit {

  constructor(
    private budget_income_service: BudgetIncomeService,
    private budget_income_ryref: DynamicDialogRef,
    private budget_income_confrim: ConfirmationService,
    private budget_income_message: MessageService
  ) { }
  @Output() closeEvent = new EventEmitter<any>()
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() data = false
  Budget_income_list$: Observable<budget_income_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25

  ngOnInit(): void {
    this.fetch()
  }


  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-budget-income-detail', nomer: 'Бюджетная заявка поступлений (создание)', id: '' } });
  }

  fetch(){
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.Budget_income_list$ = this.budget_income_service.fetch(params)
    
  }

  closeform(){
    this.closeEvent.emit()
  }

  onRowEdit(income: budget_income_doc) {

    this.newItemEvent.emit({ params: { selector: 'app-budget-income-detail', nomer: 'Бюджетная заявка поступлений ' + income.nom, id: income.id } });


  }
  onRowClick(income: budget_income_doc) {
    if (this.data) {
      this.onRowEdit(income)
    }
    else {
      this.budget_income_ryref.close(income)
    }
  }

  onDelete(item: budget_income_doc) {
    let msg = !item.deleted ? "Пометить " + item.nom + " на удаление?" : "Снять с " + item.nom + " пометку на удаление?"
    let header = !item.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    let msgsuccess = !item.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    this.budget_income_confrim.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.budget_income_service.deleteInc(item.id)
          .subscribe((data) => (
            this.budget_income_message.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetch(),
            this.budget_income_confrim.close()
          ),
            (error) => (
              this.budget_income_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
            )
          )
      },
      reject: () => {
        this.budget_income_confrim.close();
      }
    });
  }

  setClass(deleted: boolean) {
    let classs = ''

    if (deleted) {
      classs = 'class-deleted'
    }

    return classs

  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetch()
  }

}
