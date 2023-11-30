import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { budjetService } from '../../budget_request.servise';
import { budget_list, budjet_doc, budjet_doc_tab } from '../../budget_request.interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budjet-request-select',
  templateUrl: './budjet-request-select.component.html',
  styleUrls: ['./budjet-request-select.component.css']
})
export class BudjetRequestSelectComponent implements OnInit {

  constructor(
    private budget_list_messageServicedelSelect: MessageService,
    private budget_list_dialog: DialogService,
    private budget_Servise: budjetService,
    private budget_confrim: ConfirmationService,
    private Budget_request_Service: budjetService,
    private budget_list_ryref: DynamicDialogRef,
    private budjet_config: DynamicDialogConfig
  ) { }
  @Output() closeEvent = new EventEmitter<any>()
  @Output() newItemEvent = new EventEmitter<any>();
  
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
 
  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(budjet: budjet_doc) {
    this.budget_list_ryref.close(budjet)
  }

  onRowEdit(budjet: budjet_doc) {
    this.newItemEvent.emit({ params: { selector: 'app-budget-request-detail', nomer: 'Бюджетная заявка ' + budjet.nom, id: budjet.id } })
  }

  onDelete(item: budjet_doc) {
    let msg = !item.deleted ? "Пометить " + item.nom + " на удаление?" : "Снять с " + item.nom + " пометку на удаление?"
    let header = !item.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    let msgsuccess = !item.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    this.budget_confrim.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Budget_request_Service.deleteReq(item.id)
          .subscribe((data) => (
            this.budget_list_messageServicedelSelect.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetchCat(),
            this.budget_confrim.close()
          ),
            (error) => (
              this.budget_list_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
            )
          )
      },
      reject: () => {
        this.budget_confrim.close();
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
    this.fetchCat()
  }

  onSelected(budjet:budjet_doc_tab){
    if (!this.selected) {
      this.budget_list_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите документа!' })
      return
    }
    this.budget_list_ryref.close(budjet)
  }
}
