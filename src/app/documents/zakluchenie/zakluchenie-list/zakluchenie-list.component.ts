import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { zakluchenie_doc, zakluchenie_list } from '../interfaces';
import { Observable } from 'rxjs';
import { ZakluchenieService } from '../zakluchenie.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-zakluchenie-list',
  templateUrl: './zakluchenie-list.component.html',
  styleUrls: ['./zakluchenie-list.component.css']
})
export class ZakluchenieListComponent implements OnInit, OnChanges {
  @Input() tabcount = 0
  @Input() data = false
  @Output() newItemEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<any>()

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key === 'Delete' && this.isAdmin() && (this.tabcount == this.old_tabcount)) {
      this.massDelete(true)
    }
    else if (event.key === 'Delete' && (this.tabcount == this.old_tabcount)) {
      this.massDelete(false)
    }
  }

  zakluchenie_list$: Observable<zakluchenie_list>
  first = 0
  rows = 25
  windowHeight: number
  selected: any
  old_tabcount = 0

  constructor(
    private zakluchenie_service: ZakluchenieService,
    private zakluchenie_dialog_ref: DynamicDialogRef,
    private zakluchenie_confirm: ConfirmationService,
    private zakluchenie_message: MessageService
  ) { }

  ngOnInit(): void {
    this.old_tabcount = this.tabcount
    this.fetch()
  }

  ngOnChanges(): void {
    if (this.tabcount == this.old_tabcount) {
      this.fetch()
    }
  }

  isAdmin() {
    return true
  }

  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-zakluchenie-detail', nomer: 'Заявление по бюджетным заявкам', id: 0 } });
  }

  fetch() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.zakluchenie_list$ = this.zakluchenie_service.fetch(params)
  }

  onRowEdit(zakluchenie: zakluchenie_doc) {
    this.newItemEvent.emit({ params: { selector: 'app-zakluchenie-detail', nomer: 'Заключение по бюджетным заявкам ' + zakluchenie.nom, id: zakluchenie.id } });
  }

  onRowClick(zakluchenie: zakluchenie_doc) {
    if (this.data) {
      this.onRowEdit(zakluchenie)
    }
    else {
      this.zakluchenie_dialog_ref.close(zakluchenie)
    }
  }

  setClass(deleted: boolean) {
    let classs = ''

    if (deleted) {
      classs = 'class-deleted'
    }

    return classs

  }

  massDelete(shift: boolean) {

    if (this.selected) {
      let msg = !shift ? "Пометить документы на удаление?" : "Вы точно хотите удалить документы?"
      let header = !shift ? "Пометка на удаление" : "Удаление документов"
      let msgsuccess = !shift ? "Документы помечены на удаление" : "Документы удалены"

      let mass_doc_id = []

      for (let i = 0; i < this.selected.length; i++) {
        mass_doc_id.push(this.selected[i].id)
      }

      let body = {
        shift: shift,
        mass_doc_id: mass_doc_id
      }

      this.deleteService(msg, header, msgsuccess, body)
    }
    else {
      this.zakluchenie_message.add({ severity: 'error', summary: 'Ошибка', detail: 'Документ не выбран' })
    }
  }

  deleteService(msg: string, header: string, msgsuccess: string, body: any) {

    this.zakluchenie_confirm.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zakluchenie_service.
        del(body)
          .subscribe((data) => (
            this.zakluchenie_message.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetch(),
            this.zakluchenie_confirm.close()
          ),
            (error) => (
              this.zakluchenie_message.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось выполнить операцию!' })
            )
          )
      },
      reject: () => {
        this.zakluchenie_confirm.close();
      }
    });
  }

  onDelete(zakl: zakluchenie_doc) {
    let msg = !zakl.deleted ? "Пометить " + zakl.nom + " на удаление?" : "Снять с " + zakl.nom + " пометку на удаление?"
    let header = !zakl.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    let msgsuccess = !zakl.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    this.zakluchenie_confirm.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zakluchenie_service.del(zakl.id)
          .subscribe((data) => (
            this.zakluchenie_message.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetch(),
            this.zakluchenie_confirm.close()
          ),
            (error) => (
              this.zakluchenie_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
            )
          )
      },
      reject: () => {
        this.zakluchenie_confirm.close();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetch()
  }

  closeform() {
    this.closeEvent.emit()
  }

  delPast() {
    this.zakluchenie_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zakluchenie_service.del_Past()
          .subscribe((data) => (
            this.zakluchenie_message.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetch(),
            this.zakluchenie_confirm.close()
          ),
            (error) => (this.zakluchenie_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.zakluchenie_confirm.close();
      }
    })
  }
}
