import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { oblasti_element, oblasti_list } from '../interfaces';
import { OblastiService } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OblastiRegionyElementComponent } from '../oblasti-regiony-element/oblasti-regiony-element.component';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
 
@Component({
  selector: 'app-oblasti-regiony-list',
  templateUrl: './oblasti-regiony-list.component.html',
  styleUrls: ['./oblasti-regiony-list.component.css']
})
export class OblastiRegionyListComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  oblasti: Observable<oblasti_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private OblastiService: OblastiService,
    private oblasti_dialog_ref: DynamicDialogRef,
    private oblasti_dialog_servis: DialogService,
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
    this.oblasti_dialog_ref = this.oblasti_dialog_servis.open(OblastiRegionyElementComponent,
      {
        header: 'Создание',
        width: '60%',
        height: '60%',
        data: { oblasti_id: 0 }
      })

      this.oblasti_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }
  onDelete(oblasti: oblasti_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.OblastiService.obl_del(oblasti.id)
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
    this.oblasti = this.OblastiService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(oblasti: oblasti_element) {
    if (this.data) {
      this.onRowEdit(oblasti)
    }
    else {
      this.oblasti_dialog_ref.close(oblasti) 
    }
  }

  onRowEdit(oblasti: oblasti_element) {
    this.oblasti_dialog_ref = this.oblasti_dialog_servis.open(OblastiRegionyElementComponent,
      {
        header: 'Редактирование',
        width: '60%',
        height: '40%',
        data: { oblasti_id: oblasti.id }
      })

    this.oblasti_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
