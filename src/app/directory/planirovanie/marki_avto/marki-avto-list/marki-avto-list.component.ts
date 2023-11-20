import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { marki_avto_element, marki_avto_list } from '../interfaces';
import { MarkiAvtoService } from 'src/app/directory/planirovanie/marki_avto/marki-avto.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MarkiAvtoElementComponent } from '../marki-avto-element/marki-avto-element.component';
import { TipToplivaService } from 'src/app/enums/tip_topliva/tip-topliva/tiptopliva.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-marki-avto-list',
  templateUrl: './marki-avto-list.component.html',
  styleUrls: ['./marki-avto-list.component.css']
})
export class MarkiAvtoListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  marki_avto: Observable<marki_avto_list>
  windowHeight: number
  selected: any
  searchavto:string = ""
  tip_options: any =[];
  otbor_tip_topliva: string = ''
  first = 0
  rows = 25
  constructor(
    private MarkiAvtoService: MarkiAvtoService,
    private markiavto_dialog_ref: DynamicDialogRef,
    private marki_avto_dialog_servis: DialogService,
    private TipToplivaService: TipToplivaService,
    private messageServiceadd: MessageService,
    private message_confirm: ConfirmationService,
    private message_responce: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize(),
    this.selectTipTop()

  }




  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.markiavto_dialog_ref = this.marki_avto_dialog_servis.open(MarkiAvtoElementComponent,
      {
        header: 'Создание авто',
        width: '60%',
        height: '60%',
        data: { markiavto_id: 0 }
      })

      this.markiavto_dialog_ref.onClose.subscribe((save: boolean) => {

        if (save) {
          this.fetchList()
        }
      })
  }

  selectTipTop() {
    let responce: any;
    this.TipToplivaService.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results,
        console.log(this.tip_options)
      ),
        (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));

  }
  onDelete(marki_avto: marki_avto_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.MarkiAvtoService.marki_del(marki_avto.id)
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
      searchavto: this.searchavto,
      tip_topliva: this.otbor_tip_topliva
    }
    this.marki_avto = this.MarkiAvtoService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }


  onValueChange(newValue: string) {
    this.otbor_tip_topliva = newValue
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchavto: this.searchavto,
      tip_topliva: this.otbor_tip_topliva
    }
    this.marki_avto = this.MarkiAvtoService.fetch(params);
  }


  onRowClick(marki_avto: marki_avto_element) {
    if (this.data) {
      this.onRowEdit(marki_avto)
    }
    else {
      this.markiavto_dialog_ref.close(marki_avto)
    }
  }

  onRowEdit(marki_avto: marki_avto_element) {
    this.markiavto_dialog_ref = this.marki_avto_dialog_servis.open(MarkiAvtoElementComponent,
      {
        header: 'Редактирование авто',
        width: '60%',
        height: '60%',
        data: { markiavto_id: marki_avto.id }
      })

    this.markiavto_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }


}

