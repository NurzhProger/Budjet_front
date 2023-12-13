import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZakluchenieService } from '../zakluchenie.service';
import { zakluchenie_detail } from '../interfaces';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SHA256 } from 'crypto-js';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { budjetService } from '../../Budget_request/budget_request.servise';
import { fkr_detail } from 'src/app/directory/expenses/fkr/interfaces';
import { FkrSelectComponent } from 'src/app/directory/expenses/fkr/fkr-select/fkr-select.component';

@Component({
  selector: 'app-zakluchenie-detail',
  templateUrl: './zakluchenie-detail.component.html',
  styleUrls: ['./zakluchenie-detail.component.css']
})
export class ZakluchenieDetailComponent implements OnInit {
  @Input() zakluchenie_id = ''
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<any>()

  zakluchenie_detail: zakluchenie_detail
  tbl: any
  hashEnd = ''
  hashBegin = ''
  godNumber = 0
  nochanged = true
  form: FormGroup;
  items: MenuItem[];
  _vid_dannyh: any = []
  _vid_rashoda: any = []
  constructor(
    private zakluchenie_service: ZakluchenieService,
    private zakluchenieMessage: MessageService,
    private zakluchenieConfirmation: ConfirmationService,
    private zakluchenie_ref: DynamicDialogRef,
    private zaklDialog: DialogService,
    private Budget_Servise: budjetService,
    private Budget_detail_messageServicedelSelect: MessageService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      god_ucheta: new FormControl(null, [Validators.required]),
      summ: new FormControl(null),
      vid_rashoda: new FormControl(null, [Validators.required]),
      vid_dannyh: new FormControl(null, [Validators.required])
    })

    if (this.zakluchenie_id !== '') {
      this.fetch_detail()
    }
    this.selectrashod()
    this.selectdannyi()
  }

  openNew() {
    this.zakluchenie_ref = this.zaklDialog.open(FkrSelectComponent,
      {
        header: 'Выберите ФКР',
        width: '60%',
        height: '80%',
        data: { _org_id: this.zakluchenie_detail.head._organization.id }
      })

    this.zakluchenie_ref.onClose.subscribe((fkr: fkr_detail) => {
      if (fkr) {
        this.zakluchenie_detail.tbl.push(
          {
            _fkr: {
              id: fkr.id,
              code: fkr.code,
              name_rus: fkr.name_rus
            },
            id: 0,
            _zakluchenie: {
              id: 0,
              nom: '',
              org_name: ''
            },
            _spec: {
              id: 0,
              code: '',
              name_rus: ''
            },
            original_summ: 0,
            changes_summ: 0,
            final_summ: 0,
            description: '',
            characteristics: ''
          })
      }
    })
  }

  selectrashod() {
    let responce: any;
    this.Budget_Servise.fetch_vid_rashoda().subscribe(
      (data) => (
        responce = data,
        this._vid_rashoda = responce.results
      ),
      (error) => (this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectdannyi() {
    let responce: any;
    this.Budget_Servise.fetch_vid_dannyh().subscribe(
      (data) => (
        responce = data,
        this._vid_dannyh = responce.results
      ),
      (error) => (this.Budget_detail_messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  saveDoc(close: boolean): void {
    this.tbl = this.zakluchenie_detail.tbl


    this.zakluchenie_service
      .save(this.zakluchenie_detail)
      .subscribe(
        (data) => (
          this.zakluchenieMessage.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.zakluchenieMessage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.zakluchenie_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
    else (
      this.fetch_detail()
    )
  }

  fetch_detail() {
    this.zakluchenie_service.fetch_detail(this.zakluchenie_id)
      .subscribe(
        (detail) => {
          this.zakluchenie_detail = detail,
            this.preobGodNumber()
        }
      )
  }



  preobGodNumber() {
    this.godNumber = parseInt(this.zakluchenie_detail.head.god_ucheta.slice(0, 4))
    let objString = JSON.stringify(this.zakluchenie_detail)
    this.hashBegin = SHA256(objString).toString()
  }

  closeform(close: boolean) {
    let objString = JSON.stringify(this.zakluchenie_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.zakluchenieConfirmation.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.zakluchenieConfirmation.close()
          },
          reject: () => {
            this.zakluchenieConfirmation.close()
          }
        })
      }
    }
  }

  viewOrg() {
    this.zakluchenie_ref = this.zaklDialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.zakluchenie_detail.head._organization.id }
      })

    this.zakluchenie_ref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.zakluchenie_detail.head._organization.id = org.id,
          this.zakluchenie_detail.head._organization.name_rus = org.name_rus
      }
    })
  }

  selectOrg() {
    this.zakluchenie_ref = this.zaklDialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.zakluchenie_ref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.zakluchenie_detail.head._organization.id = org.id,
          this.zakluchenie_detail.head._organization.name_rus = org.name_rus
      }
    })
  }

  changeGodUch() {
    this.zakluchenie_detail.head.god_ucheta = String(this.godNumber + '-01-01')
  }

  onDelete(_fkr_id: number, _fkr_name: string) {

    this.zakluchenieConfirmation.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = this.zakluchenie_detail.tbl.length - 1; i >= 0; i--) {
          let index = this.zakluchenie_detail.tbl.findIndex(item => _fkr_id === item._fkr.id)
          if (index !== -1) {
            this.zakluchenie_detail.tbl.splice(index, 1)
          }
        }
        this.zakluchenieConfirmation.close()
      },
      reject: () => {
        this.zakluchenieConfirmation.close();
      }
    });
  }

}
