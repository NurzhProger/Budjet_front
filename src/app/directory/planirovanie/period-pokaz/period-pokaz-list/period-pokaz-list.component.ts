import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { period_pokaz_element, period_pokaz_list } from '../interfaces';
import { PeriodPokazService } from '../period-pokaz.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PeriodPokazElementComponent } from '../period-pokaz-element/period-pokaz-element.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-period-pokaz-list',
  templateUrl: './period-pokaz-list.component.html',
  styleUrls: ['./period-pokaz-list.component.css']
})
export class PeriodPokazListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  period_pokaz: Observable<period_pokaz_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private PeriodPokazService: PeriodPokazService,
    private period_pokaz_dialog_ref: DynamicDialogRef,
    private period_pokaz_dialog_servis: DialogService,
    private message_confirm: ConfirmationService,
    private message_responce: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.period_pokaz_dialog_ref = this.period_pokaz_dialog_servis.open(PeriodPokazElementComponent,
      {
        header: 'Создание периодических показателей',
        width: '60%',
        height: '60%',
        data: { periodpokaz_id: 0 }
      })

      this.period_pokaz_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }
  onDelete(period_pokaz: period_pokaz_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.PeriodPokazService.period_del(period_pokaz.id)
          .subscribe((data) => (
            this.message_responce.add(
              {
                severity: 'success',
                summary: 'Успешно',
                detail: ' Объект удален!'
              }
            ),
            this.fetchList(),
            this.message_confirm.close()
          ),
            (error) => (this.message_responce.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }))
          )
      },
      reject: () => {
        this.message_confirm.close();
      }
    })
  }
  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.period_pokaz = this.PeriodPokazService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(period_pokaz: period_pokaz_element) {
    if (this.data) {
      this.onRowEdit(period_pokaz)
    }
    else {
      this.period_pokaz_dialog_ref.close(period_pokaz) 
    }
  }

  onRowEdit(period_pokaz: period_pokaz_element) {
    this.period_pokaz_dialog_ref = this.period_pokaz_dialog_servis.open(PeriodPokazElementComponent,
      {
        header: 'Редактирование периода показателей',
        width: '60%',
        height: '40%',
        data: { periodpokaz_id: period_pokaz.id }
      })

    this.period_pokaz_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }
}
