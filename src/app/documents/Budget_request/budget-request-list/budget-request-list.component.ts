import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { budjetService } from '../budget_request.servise'
import { budget_list, budjet_doc } from '../budget_request.interfaces';
import { boolean, log } from 'mathjs';

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
    private budget_confrim: ConfirmationService,
    private Budget_request_Service: budjetService) { }




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


  ngOnInit  (): void {
    this.fetchCat(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight
  }

  fetchCat(){
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searcforms.toString()
    }

    this.Budget_list$ = this.budget_Servise.fetch(params)
  }


  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-budget-request-detail', nomer: 'Бюджетная заявка (создание)', id: '' } });
  }



  delPast() {
    this.budget_confrim.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.budget_Servise.del_Past()
          .subscribe((data) => (
            this.budget_list_messageServicedelSelect.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetchCat(),
            this.budget_confrim.close()
          ),
            (error) => (this.budget_list_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.budget_confrim.close();
      }
    })
  }



  onSelected() {

  }

  closeform() {
    this.closeEvent.emit()
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

  onRowEdit(budjet: budjet_doc) {

    this.newItemEvent.emit({ params: { selector: 'app-budget-request-detail', nomer: 'Бюджетная заявка ' + budjet.nom, id: budjet.id } });


  }

  onRowClick(budjet: budjet_doc) {
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
  setClass(deleted: boolean) {
    let classs = ''

    if (deleted) {
      classs = 'class-deleted'
    }

    return classs

  }

}
