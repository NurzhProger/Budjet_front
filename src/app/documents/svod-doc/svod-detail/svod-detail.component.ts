import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { svod_detail } from '../interfaces';
import { SvodService } from '../svod.servise';
import { SHA256 } from 'crypto-js';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { log } from 'mathjs';

@Component({
  selector: 'app-svod-detail',
  templateUrl: './svod-detail.component.html',
  styleUrls: ['./svod-detail.component.css']
})
export class SvodDetailComponent implements OnInit {
  @Input() svod_id = ''
  @Output() closeEvent = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<any>()
  
  constructor(
    private svodService: SvodService,
    private svod_Message_Service: MessageService,
    private svod_Confirm_Service: ConfirmationService,
    private svod_detail_Rer: DynamicDialogRef,
    private svod_Dialog_Service: DialogService
    
  ) { }
  items: MenuItem[];
  tbl: any = []
  svod_detail: svod_detail
  godNumber: number
  hashBegin = ''
  hashEnd = ''
  form: FormGroup
  _vid_rashoda: any = []
  _vid_dannyh: any = []
  _vid_operacii: any = []

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      god_ucheta: new FormControl(null, [Validators.required]),
      vid_rashoda: new FormControl(null, [Validators.required]),
      vid_dannyh: new FormControl(null, [Validators.required]),
      vid_operacii: new FormControl(null, [Validators.required]),
      summ: new FormControl(null)
    })
    this.selectrashod()
    this.selectdannyi()
    this.selectoperacii()
    if (this.svod_id !== '') {
      this.svodService.fetch_detail(this.svod_id)
        .subscribe(
          (detail) => {
            this.svod_detail = detail,
            console.log(this.svod_detail.tbl);
            
              this.preobGodNumber()
          }
        )
    } 
  }
  selectrashod() {
    let responce: any;
    this.svodService.fetch_vid_rashoda().subscribe(
      (data) => (
        responce = data,
        this._vid_rashoda = responce.results
      ),
      (error) => (this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectdannyi() {
    let responce: any;
    this.svodService.fetch_vid_dannyh().subscribe(
      (data) => (
        responce = data,
        this._vid_dannyh = responce.results
      ),
      (error) => (this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  selectoperacii() {
    let responce: any;
    this.svodService.fetch_vid_oparecii().subscribe(
      (data) => (
        responce = data,
        this._vid_operacii = responce.results
      ),
      (error) => (this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  preobGodNumber() {
    this.godNumber = parseInt(this.svod_detail.head.god_ucheta.slice(0, 4))
    let objString = JSON.stringify(this.svod_detail)
    this.hashBegin = SHA256(objString).toString()
  }
  changeGodUch() {
    this.svod_detail.head.god_ucheta = String(this.godNumber + '-01-01')
  }
  saveDoc(close: boolean) {
    
    this.tbl = this.svod_detail.tbl
    this.svod_detail.tbl = this.tbl

    this.svodService
      .saveSvod(this.svod_detail)
      .subscribe(
        (data) => (
          this.svod_Message_Service.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.svod_Message_Service.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }
  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.svod_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }
  closeform(close: boolean) {
    let objString = JSON.stringify(this.svod_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.svod_Confirm_Service.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.svod_Confirm_Service.close()
          },
          reject: () => {
            this.svod_Confirm_Service.close()
          }
        })
      }
    }
  }
  viewOrg() {
    this.svod_detail_Rer = this.svod_Dialog_Service.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.svod_detail.head._organization.id }
      })

    this.svod_detail_Rer.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.svod_detail.head._organization.id = org.id,
          this.svod_detail.head._organization.name_rus = org.name_rus
      }
    })
  }
  selectOrg() {
    this.svod_detail_Rer = this.svod_Dialog_Service.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.svod_detail_Rer.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.svod_detail.head._organization.id = org.id,
          this.svod_detail.head._organization.name_rus = org.name_rus
      }
    })
  }

  
}
