import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { utv_income_doc, utv_income_list } from '../interfaces';
import { UtvIncomeService } from '../utv_income.service';

@Component({
  selector: 'app-utv-income-list',
  templateUrl: './utv-income-list.component.html',
  styleUrls: ['./utv-income-list.component.css']
})
export class UtvIncomeListComponent implements OnInit {

  constructor(
    private utvListService: UtvIncomeService,
    private utvListref: DynamicDialogRef,
    private utvListconfirm: ConfirmationService,
    private utvListdialog: DialogService,
    private utvListmessage: MessageService,
  ) { }

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>()
  utvList$: Observable<utv_income_list>
  searchutvList = ''
  first = 0
  rows = 25
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchUtvList(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  closeform() {
    this.closeEvent.emit()
  }
  
  fetchUtvList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }

    this.utvList$ = this.utvListService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchUtvList()
  }

  onDelete(utv_inc: utv_income_doc) {
    let msg = !utv_inc.deleted ? "Пометить " + utv_inc.nom + " на удаление?" : "Снять с " + utv_inc.nom + " пометку на удаление?"
    let header = !utv_inc.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    let msgsuccess = !utv_inc.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    this.utvListconfirm.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.utvListService.deleteUtv(utv_inc.id)
          .subscribe((data) => (
            this.utvListmessage.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetchUtvList(),
            this.utvListconfirm.close()
          ),
            (error) => (
              this.utvListmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось выполнить операцию!' })
            )
          )
      },
      reject: () => {
        this.utvListconfirm.close();
      }
    });
  }

  onRowEdit(utv_inc: utv_income_doc) {
    this.newItemEvent.emit({ params: { selector: 'app-utv-income-detail', nomer: 'Утвержденный план по поступлениям ' + utv_inc.nom, id: utv_inc.id } });
  }

  NewDoc() {
    this.newItemEvent.emit({ params: { selector: 'app-utv-income-detail', nomer: 'Утвержденный план по поступлениям ', id: '' } });
  }

}
