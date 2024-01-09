import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FkrSelectComponent } from 'src/app/directory/expenses/fkr/fkr-select/fkr-select.component';
import { fkr_detail } from 'src/app/directory/expenses/fkr/interfaces';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { Prilozhenie5758Service } from './prilojenie5758.service';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'mathjs';
import { profileuser } from 'src/app/login/interfaces';
import { MainComponent } from 'src/app/main/main.component/main.component';
import { ABPSelectComponent } from 'src/app/directory/expenses/ABP/abp-select/abp-select.component';
import { abp_detail } from 'src/app/directory/expenses/ABP/interfaces';
import { SelectProgramComponent } from '../select_program_report/select-program/select-program.component';
import { SelectPodprogramComponent } from '../select_podprogram_report/select-podprogram/select-podprogram.component';
import { SelectSpecComponent } from '../select_spec_report/select-spec/select-spec.component';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-prilozhenie5758',
  templateUrl: './prilozhenie5758.component.html',
  styleUrls: ['./prilozhenie5758.component.css']
})
export class Prilozhenie5758Component implements OnInit {
  host = ''
  @Output() closeEvent = new EventEmitter<any>()
  constructor(
    private Reportref: DynamicDialogRef,
    private ReportPodProgramref: DynamicDialogRef,
    private Reportdialog: DialogService,
    private ReportPodProgdialog: DialogService,
    private MainComponent: MainComponent,
    private Reportmsg: MessageService,
    private Prilozhenie5758Service: Prilozhenie5758Service,
    private sanitizer: DomSanitizer,
    private ReportSpecref: DynamicDialogRef,
    private ReportSpecdialog: DialogService,
    private authservice: AuthService
  ) {
    this.profileuser = this.MainComponent.profileuser
    this.host = this.authservice.host;
  }
  sidebarVisible: boolean = false;
  isLoading: boolean = false;
  profileuser: profileuser
  prilozhenieType: any = []
  reportLanguages: any = []
  dimension: any = []
  byOrg: false
  url: any = ''
  prilozhenieValue = 'prilozhenie57'
  dimensionValue = 1
  tochnost = 0
  godUcheta = 0
  koeff_1_year_110_130 = 0
  koeff_1_year_140 = 0
  koeff_1_year_150 = 0
  koeff_1_year_160 = 0
  koeff_2_year_110_130 = 0
  koeff_2_year_140 = 0
  koeff_2_year_150 = 0
  koeff_2_year_160 = 0
  languageValue = 'kz'
  _organization = {
    'id': 0,
    'name': ''
  }
  _abp = {
    'id': 0,
    'code': ''
  }
  _program = [
    {
      'id': 0,
      'code': ''
    }
  ]
  _podprogram = [
    {
      'id': 0,
      'code': ''
    }
  ]
  _spec = [
    {
      'id': 0,
      'code': ''
    }
  ]
  _date: Date = new Date;
  _date_min: Date;
  _date_max: Date;
  _fkr = {
    'id': 0,
    'name': '',
    'code': ''
  }

  ngOnInit(): void {
    this._date_min = new Date(this._date.getFullYear(), 0, 1)
    this.godUcheta = Number(new Date(this._date.getFullYear()))
    this._date_max = this._date
    this._organization = {
      id: parseInt(this.profileuser.org_id),
      name: this.profileuser.org_name
    }
    this.prilozhenieType = [
      { label: 'Приложение 57', value: 'prilozhenie57' },
      { label: 'Приложение 58', value: 'prilozhenie58' }
    ]
    this.reportLanguages = [
      { label: 'Каз', value: 'kz' },
      { label: 'Рус', value: 'ru' }
    ]
    this.dimension = [
      { label: 'тенге', value: 1 },
      { label: 'тыс. тенге', value: 1000 }
    ]

  }

  form() {
    this.isLoading = true
    let params = {
      org_id: this._organization.id,
      fkr_id: this._fkr.id,
      _date_min: this.toLocaleDate(this._date_min),
      _date_max: this.toLocaleDate(this._date_max),
      _program: this._program,
      _podprogram: this._podprogram,
      _language: this.languageValue,
      _dimension: this.dimensionValue,
      _tochnost: this.tochnost,
      _abp: this._abp.id,
      _spec: this._spec,
      byOrg: this.byOrg,
      koeff_1_year_110_130: this.koeff_1_year_110_130,
      koeff_1_year_140: this.koeff_1_year_140,
      koeff_1_year_150: this.koeff_1_year_150,
      koeff_1_year_160: this.koeff_1_year_160,
      koeff_2_year_110_130: this.koeff_2_year_110_130,
      koeff_2_year_140: this.koeff_2_year_140,
      koeff_2_year_150: this.koeff_2_year_150,
      koeff_2_year_160: this.koeff_2_year_160
    }

    if (this._organization.id == 0) {
      this.Reportmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию' })
      return
    } else if (this._fkr.id == 0) {
      this.Reportmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ФКР' })
      return
    }

    if (this.prilozhenieValue == 'prilozhenie57') {
      this.Prilozhenie5758Service
        .getReport57(params)
        .subscribe
        (data => {
          let asd: any = data
          // let blob: Blob = new Blob([data], { type: 'application/pdf' });
          // let url = window.URL.createObjectURL(blob);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + asd.status);
          this.isLoading = false
        })

    }
    else if (this.prilozhenieValue == 'prilozhenie58') {
      this.Prilozhenie5758Service
        .getReport58(params)
        .subscribe
        (data => {
          let asd: any = data
          // let blob: Blob = new Blob([data], { type: 'application/pdf' });
          // let url = window.URL.createObjectURL(blob);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + asd.status);
          this.isLoading = false
        })

    }


  }
  toLocaleDate(dateForStr: Date) {
    return new Date(dateForStr).toLocaleDateString();
  }
  viewOrg() {
    this.Reportref = this.Reportdialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this._organization.id }
      })

    this.Reportref.onClose.subscribe((org: organization_detail) => {
      if (org) {

      }
    })
  }

  selectOrg() {
    this.Reportref = this.Reportdialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.Reportref.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this._organization.id = org.id,
          this._organization.name = org.name_rus
      }
    })
  }

  selectABP() {
    this.Reportref = this.Reportdialog.open(ABPSelectComponent,
      {
        header: 'Выбор АБП',
        width: '60%',
        height: '80%'
      })

    this.Reportref.onClose.subscribe((abp: abp_detail) => {
      if (abp) {
        this._abp.id = abp.id,
          this._abp.code = abp.code
      }
    })
  }

  selectFKR() {
    this.Reportref = this.Reportdialog.open(FkrSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%',
        data: { _org_id: 0 }
      })

    this.Reportref.onClose.subscribe((fkr: fkr_detail) => {
      if (fkr) {
        this._fkr.id = fkr.id,
          this._fkr.name = fkr.code + '. ' + fkr.name_rus
      }
    })
  }

  selectProgram() {
    this.Reportref = this.Reportdialog.open(SelectProgramComponent,
      {
        header: 'Список программ',
        width: '80%',
        height: '80%',
        data: { program: this._program, abp_id: this._abp.id }
      })

    this.Reportref.onClose.subscribe((select: any) => {
      if (select) {
        if (select.length > 0) {
          this._program = select
        } else {
          this._program = [
            {
              'id': 0,
              'code': ''
            }
          ]
        }
      }

    })
  }

  selectPodprogram() {
    this.ReportPodProgramref = this.ReportPodProgdialog.open(SelectPodprogramComponent,
      {
        header: 'Список подпрограмм',
        width: '80%',
        height: '80%',
        data: { podprogram: this._podprogram, abp_id: this._abp.id, program: this._program }
      })

    this.ReportPodProgramref.onClose.subscribe((select: any) => {
      if (select) {
        if (select.length > 0) {
          this._podprogram = select
        } else {
          this._podprogram = [
            {
              'id': 0,
              'code': ''
            }
          ]
        }
      }
    })
  }

  selectSpec() {
    this.ReportSpecref = this.ReportSpecdialog.open(SelectSpecComponent,
      {
        header: 'Список cпецифик',
        width: '80%',
        height: '80%',
        data: { spec: this._spec }
      })

    this.ReportSpecref.onClose.subscribe((select: any) => {
      if (select) {
        if (select.length > 0) {
          this._spec = select
        } else {
          this._podprogram = [
            {
              'id': 0,
              'code': ''
            }
          ]
        }
      }
    })
  }

  changePrilozhenie() {
    this.url = ''
  }

  closeform() {
    this.closeEvent.emit();
  }

  checkLength() {

    if (this.tochnost > 3) {
      this.tochnost = 3
    }
  }

}
