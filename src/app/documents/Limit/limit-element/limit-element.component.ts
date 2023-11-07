import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { limit_detail, limit_doc } from '../interfaces';
import { SHA256 } from 'crypto-js';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LimitService } from '../limit.service';
import { FkrSelectComponent } from 'src/app/directory/expenses/fkr/fkr-select/fkr-select.component';
import { fkr_detail } from 'src/app/directory/expenses/fkr/interfaces';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { profileuser } from 'src/app/login/interfaces';
import { MainComponent } from 'src/app/main/main.component/main.component';

@Component({
  selector: 'app-limit-element',
  templateUrl: './limit-element.component.html',
  styleUrls: ['./limit-element.component.css']
})
export class LimitElementComponent implements OnInit, DoCheck {
  @Output() closeEvent = new EventEmitter<any>();
  @Input() limit_id = ''
  constructor(
    private LimitService: LimitService,
    private limitMessage: MessageService,
    private MainComponent: MainComponent,
    private fkrRef: DynamicDialogRef,
    private limitDetaildialog: DialogService,
    private limitDetailconfirm: ConfirmationService
  ) {
    this.profileuser = this.MainComponent.profileuser
    this.items = [
      {
        label: 'Записать',
        icon: 'pi pi-save',
        command: () => {
          this.saveDoc(false);
        }
      }
    ]
  }

  profileuser: profileuser
  items: MenuItem[];
  form: FormGroup;
  selected = false;

  limitDetail: limit_detail


  hashEnd = ''
  hashBegin = ''
  godNumber = 0
  nochanged = true

  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      god_ucheta: new FormControl(null, [Validators.required])
    })


    if (this.limit_id !== '') {
      this.LimitService.fetch_detail(this.limit_id)
        .subscribe(
          (detail) => {
            this.limitDetail = detail,
              this.preobGodNumber()
          }
        )
    }

    if (this.limitDetail.head._organization.id == 0) {
      this.limitDetail.head._organization = {
        id: parseInt(this.profileuser.org_id),
        bin: '',
        name_kaz: '',
        name_rus: this.profileuser.org_name,
        adress: '',
        deleted: false,
        _budjet_reg: {
          id: 0,
          code: '',
          name_kaz: '',
          name_rus: ''
        },
        _regiondar: {
          id: 0,
          name: '',
          name_kaz: '',
          name_rus: ''
        },
        _abp: {
          id: 0,
          code: '',
          name_kaz: '',
          name_rus: ''
        },
        parent_organizations: [{
          id: 0,
          _date: '',
          _organization: 0,
          _parent: {
            id: 0,
            name_rus: ''
          }
        }
        ]

      }
    }

  }
  formatNumber(value: number): string {
    return value.toFixed(3);
  }

  ngDoCheck(): void {
    let objString = JSON.stringify(this.limitDetail)
    let hashBeg = SHA256(objString).toString()

    if (hashBeg !== this.hashBegin && this.nochanged) {
      this.nochanged = false
      this.hashBegin = hashBeg
    }
  }

  preobGodNumber() {
    this.godNumber = parseInt(this.limitDetail.head.god_ucheta.slice(0, 4))
    let objString = JSON.stringify(this.limitDetail)
    this.hashBegin = SHA256(objString).toString()
  }

  changeGodUch() {
    this.limitDetail.head.god_ucheta = String(this.godNumber + '-01-01')
  }

  addFKR() {
    this.fkrRef = this.limitDetaildialog.open(FkrSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%'
      })

    this.fkrRef.onClose.subscribe((fkr: fkr_detail) => {
      if (fkr) {
        this.limitDetail.tbl.push(
          {
            _fkr: {
              id: fkr.id,
              code: fkr.code,
              name_kaz: fkr.name_kaz,
              name_rus: fkr.name_rus
            },
            id: 0,
            summ: 0,
            _limit_plan: this.limitDetail.head.id
          })
      }
    })
  }

  viewOrg() {
    this.fkrRef = this.limitDetaildialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.limitDetail.head._organization.id }
      })

    this.fkrRef.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.limitDetail.head._organization.id = org.id,
          this.limitDetail.head._organization.name_rus = org.name_rus
      }
    })
  }

  selectOrg() {
    this.fkrRef = this.limitDetaildialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.fkrRef.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.limitDetail.head._organization.id = org.id,
          this.limitDetail.head._organization.name_rus = org.name_rus
      }
    })
  }

  saveDoc(close: boolean): void {
    let responce: any
    this.LimitService.saveLimit(this.limitDetail)
      .subscribe(
        (data) => (
          this.limitMessage.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          responce = data, this.limitDetail = responce, this.closeaftersave(close)
        ),
        (error) => (
          this.limitMessage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.limitDetail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
  }

  closeform(close: boolean) {

    let objString = JSON.stringify(this.limitDetail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {

        this.limitDetailconfirm.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.limitDetailconfirm.close()
          },
          reject: () => {
            this.limitDetailconfirm.close()
          }
        })
      }
    }
  }

  viewFKR(fkr_id: number) {

  }

  editFKR(ri: number) {
    this.fkrRef = this.limitDetaildialog.open(FkrSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%'
      })
    this.fkrRef.onClose.subscribe((fkr: fkr_detail) => {
      if (fkr) {
        this.limitDetail.tbl[ri]._fkr = {
          id: fkr.id,
          code: fkr.code,
          name_kaz: fkr.name_kaz,
          name_rus: fkr.name_rus
        }
      }
    })
  }

  onDelete(fkr_id: number, fkr_name: string) {

    this.limitDetailconfirm.confirm({
      message: 'Вы действительно хотите удалить ' + fkr_name + '?',
      header: 'Удаление классификации',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = this.limitDetail.tbl.length - 1; i >= 0; i--) {
          let index = this.limitDetail.tbl.findIndex(item => fkr_id === item._fkr.id)
          if (index !== -1) {
            this.limitDetail.tbl.splice(index, 1)
          }
        }
        this.limitDetailconfirm.close()
      },
      reject: () => {
        this.limitDetailconfirm.close();
      }
    });
  }

}
