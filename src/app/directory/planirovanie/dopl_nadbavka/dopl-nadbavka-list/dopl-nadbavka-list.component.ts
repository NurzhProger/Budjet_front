import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { doplaty_nadbavky_element, doplaty_nadbavky_list } from '../interfaces';
import { DoplatyNadbavkyService } from '../doplaty-nadbavky.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoplNadbavkaElementComponent } from '../dopl-nadbavka-element/dopl-nadbavka-element.component';
import { DoplataService } from '../../../../enums/tip_dopl/tip-dopl/doplata.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dopl-nadbavka-list',
  templateUrl: './dopl-nadbavka-list.component.html',
  styleUrls: ['./dopl-nadbavka-list.component.css']
})
export class DoplNadbavkaListComponent implements OnInit {


  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  doplaty_nadbavky: Observable<doplaty_nadbavky_list>
  windowHeight: number
  selected: any
  search:string = ""
  first = 0
  tip_options: any =[];
  otbor_tip_doplata: string = ''
  rows = 25

  constructor(
    private DoplatyNadbavkyService: DoplatyNadbavkyService,
    private dopl_dialog_ref: DynamicDialogRef,
    private dopl_dialog_servis: DialogService,
    private tip_doplata_serv:DoplataService,
    private japan_massage_body: MessageService,
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
    this.dopl_dialog_ref = this.dopl_dialog_servis.open(DoplNadbavkaElementComponent,
      {
        header: 'Создание доплат и надбавок',
        width: '60%',
        height: '60%',
        data: { doplata_id: 0 }
      })

      this.dopl_dialog_ref.onClose.subscribe((save: boolean) => {

        if (save) {
          this.fetchList()
        }
      })
  }


  selectTipTop() {
    let responce: any;
    this.tip_doplata_serv.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results
      ),
        (error) => (this.japan_massage_body.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));

  }

  onValueChange(newValue: string){

    this.otbor_tip_doplata = newValue
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search,
      tip_dopl: this.otbor_tip_doplata
    }
    this.doplaty_nadbavky = this.DoplatyNadbavkyService.fetch(params);

  }
  onDelete(dopl_nadbavky: doplaty_nadbavky_element) {
    this.message_confirm.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.DoplatyNadbavkyService.dopl_del(dopl_nadbavky.id)
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
      search: this.search,
    }
    this.doplaty_nadbavky = this.DoplatyNadbavkyService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.fetchList()
  }

  onRowClick(dopl_nadbavky: doplaty_nadbavky_element) {
    if (this.data) {
      this.onRowEdit(dopl_nadbavky)
    }
    else {
      this.dopl_dialog_ref.close(dopl_nadbavky)
    }
  }


  onRowEdit(dopl_nadbavky: doplaty_nadbavky_element) {
    this.dopl_dialog_ref = this.dopl_dialog_servis.open(DoplNadbavkaElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { doplata_id: dopl_nadbavky.id }
      })

    this.dopl_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }
}
