import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { limit_doc, limit_list } from '../interfaces';
import { LimitService } from '../limit.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LimitElementComponent } from '../limit-element/limit-element.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-limit-list',
  templateUrl: './limit-list.component.html',
  styleUrls: ['./limit-list.component.css']
})
export class LimitListComponent implements OnInit, OnChanges {
  @Input() tabcount = 0
  @Input() data = false
  @Output() newItemEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<any>()
  limit: Observable<limit_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  old_tabcount = 0
  constructor(
    private LimitService: LimitService,
    private limit_dialog_ref: DynamicDialogRef,
    private limit_dialog_servis: DialogService,
    private limit_confirm: ConfirmationService,
    private limit_message_service: MessageService
  ) { }

  ngOnInit(): void {
    this.old_tabcount = this.tabcount
    this.fetchList(),
    this.updateWindowSize() 
  }

  ngOnChanges(): void {
    if (this.tabcount == this.old_tabcount) {
      this.fetchList()
    }
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-limit-element', nomer: 'Лимит на годовой бюджет ', id: 0 } });
  }
  
  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.limit = this.LimitService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onDelete(limit: limit_doc) {
    let msg = !limit.deleted ? "Пометить " + limit.nom + " на удаление?" : "Снять с " + limit.nom + " пометку на удаление?"
    let header = !limit.deleted ? "Пометка на удаление" : "Снять с пометки на удаление"
    let msgsuccess = !limit.deleted ? "Документ помечен на удаление" : "С документа снята пометка на удаление"

    this.limit_confirm.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.LimitService.delLimit(limit.id)
          .subscribe((data) => (
            this.limit_message_service.add({ severity: 'success', summary: 'Успешно', detail: msgsuccess }),
            this.fetchList(),
            this.limit_confirm.close()
          ),
            (error) => (
              this.limit_message_service.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
            )
          )
      },
      reject: () => {
        this.limit_confirm.close();
      }
    });
  }
  onRowEdit(limit: limit_doc) {
    this.newItemEvent.emit({ params: { selector: 'app-limit-element', nomer: 'Лимит на годовой бюджет ' + limit.nom, id: limit.id } });
  }

  onRowClick(limit: limit_doc) {
    if (this.data) {
      this.onRowEdit(limit)
    }
    else {
      this.limit_dialog_ref.close(limit)
    }
  }
  setClass(deleted: boolean) {
    let classs = ''

    if (deleted) {
      classs = 'class-deleted'
    }

    return classs

  }
  delPast() {
    this.limit_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.LimitService.del_Past()
          .subscribe((data) => (
            this.limit_message_service.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetchList(),
            this.limit_confirm.close()
          ),
            (error) => (this.limit_message_service.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.limit_confirm.close();
      }
    })
  }

}
