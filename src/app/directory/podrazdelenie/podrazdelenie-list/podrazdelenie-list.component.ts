import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { podrazdelenie_element, podrazdelenie_list } from '../interfaces';
import { PodrazdelenieService } from '../podrazdelenie.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PodrazdelenieElementComponent } from '../podrazdelenie-element/podrazdelenie-element.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-podrazdelenie-list',
  templateUrl: './podrazdelenie-list.component.html',
  styleUrls: ['./podrazdelenie-list.component.css']
})
export class PodrazdelenieListComponent implements OnInit {

  constructor(
    private PodrazdelenieService: PodrazdelenieService,
    private podr_dialog_ref: DynamicDialogRef,
    private podr_dialog_servis: DialogService,
    private message_confirm: ConfirmationService,
    private message_responce: MessageService
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false

  first = 0
  rows = 25
  searchPodr = ''
  podrazdelenie: Observable<podrazdelenie_list>
  windowHeight: number
  selected: any


  ngOnInit(): void {
    this.fetchList(),
      this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.podr_dialog_ref = this.podr_dialog_servis.open(PodrazdelenieElementComponent,
      {
        header: 'Создание подразделения',
        width: '60%',
        height: '60%',
        data: { podrazdelenie_id: 0 }
      })

    this.podr_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

  search() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchPodr: this.searchPodr

    }
    this.podrazdelenie = this.PodrazdelenieService.fetch(params);
  }

  onDelete(podr: podrazdelenie_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.PodrazdelenieService.podr_del(podr.id)
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
      offset: this.first.toString(),
      searchPodr: this.searchPodr
    }
    this.podrazdelenie = this.PodrazdelenieService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(podr: podrazdelenie_element) {
    if (this.data) {
      this.onRowEdit(podr)
    }
    else {
      this.podr_dialog_ref.close(podr)
    }
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowEdit(podr: podrazdelenie_element) {
    this.podr_dialog_ref = this.podr_dialog_servis.open(PodrazdelenieElementComponent,
      {
        header: 'Редактирование подразделении',
        width: '60%',
        height: '40%',
        data: { podrazdelenie_id: podr.id }
      })

    this.podr_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }
}
