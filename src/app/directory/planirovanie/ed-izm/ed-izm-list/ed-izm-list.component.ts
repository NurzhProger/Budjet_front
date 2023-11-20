import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ed_izm_element, ed_izm_list } from '../interfaces';
import { Observable } from 'rxjs';
import { EdIzmService } from 'src/app/directory/planirovanie/ed-izm/ed-izm.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EdIzmElementComponent } from '../ed-izm-element/ed-izm-element.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ed-izm-list',
  templateUrl: './ed-izm-list.component.html',
  styleUrls: ['./ed-izm-list.component.css']
})
export class EdIzmListComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  ed_izm: Observable<ed_izm_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private EdIzmService: EdIzmService,
    private edizm_dialog_ref: DynamicDialogRef,
    private edizm_dialog_servis: DialogService,
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
    this.edizm_dialog_ref = this.edizm_dialog_servis.open(EdIzmElementComponent,
      {
        header: 'Создание единицы измерения',
        width: '60%',
        height: '60%',
        data: { edizm_id: 0 }
      })

      this.edizm_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }
  onDelete(ed_izm: ed_izm_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.EdIzmService.ed_del(ed_izm.id)
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
    this.ed_izm = this.EdIzmService.fetch(params);
  }

  onRowClick(ed_izm: ed_izm_element) {
    if (this.data) {
      this.onRowEdit(ed_izm)
    }
    else {
      this.edizm_dialog_ref.close(ed_izm) 
    }
  }

  onRowEdit(ed_izm: ed_izm_element) {
    this.edizm_dialog_ref = this.edizm_dialog_servis.open(EdIzmElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '40%',
        data: { edizm_id: ed_izm.id }
      })

    this.edizm_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
