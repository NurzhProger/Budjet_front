import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { zakluchenie_doc, zakluchenie_list } from '../interfaces';
import { Observable } from 'rxjs';
import { ZakluchenieService } from '../zakluchenie.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-zakluchenie-list',
  templateUrl: './zakluchenie-list.component.html',
  styleUrls: ['./zakluchenie-list.component.css']
})
export class ZakluchenieListComponent implements OnInit {

  @Input() data = false
  @Output() newItemEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<any>()

  zakluchenie_list$: Observable<zakluchenie_list>
  first = 0
  rows = 25
  windowHeight: number
  selected: any

  constructor(
    private zakluchenie_service: ZakluchenieService,
    private zakluchenie_dialog_ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.fetch()
  }

  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-zakluchenie-detail', nomer: 'Заявление по бюджетным заявкам', id: '' } });
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

  onDelete(limit: zakluchenie_doc) {
    // let msg = !limit.deleted ? "Пометить " + limit.nom + " на удаление?" : "Снять с " + limit.nom + " пометку на удаление?"
    // let header = !limit.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    // let msgsuccess = !limit.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    // this.limit_confirm.confirm({
    //   message: msg,
    //   header: header,
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.LimitService.delLimit(limit.id)
    //       .subscribe((data) => (
    //         this.limit_message_service.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
    //         this.fetchList(),
    //         this.limit_confirm.close()
    //       ),
    //         (error) => (
    //           this.limit_message_service.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
    //         )
    //       )
    //   },
    //   reject: () => {
    //     this.limit_confirm.close();
    //   }
    // });
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetch()
  }

  closeform() {
    this.closeEvent.emit()
  }
}
