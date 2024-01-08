import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { log } from 'mathjs';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { Prilozhenie60NewService } from './prilojenie60new.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MainComponent } from 'src/app/main/main.component/main.component';
import { profileuser } from 'src/app/login/interfaces';
import { ABPSelectComponent } from 'src/app/directory/expenses/ABP/abp-select/abp-select.component';
import { abp_detail } from 'src/app/directory/expenses/ABP/interfaces';
import { SelectProgramComponent } from '../../prilozhenie_57_58/select_program_report/select-program/select-program.component';
import { SelectPodprogramComponent } from '../../prilozhenie_57_58/select_podprogram_report/select-podprogram/select-podprogram.component';
import { SelectSpecComponent } from '../../prilozhenie_57_58/select_spec_report/select-spec/select-spec.component';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-prilozhenie60-new',
  templateUrl: './prilozhenie60-new.component.html',
  styleUrls: ['./prilozhenie60-new.component.css']
})
export class Prilozhenie60NewComponent implements OnInit {
  
  sidebarVisible: boolean = false;
  host = ''
  @Output() closeEvent = new EventEmitter<any>()
  constructor(
    private Reportref: DynamicDialogRef,
    private ReportProgramref: DynamicDialogRef,
    private ReportPodProgramref: DynamicDialogRef,
    private ReportSpecref: DynamicDialogRef,
    private ReportProgramdialog: DialogService,
    private ReportPodProgdialog: DialogService,
    private ReportSpecdialog: DialogService,
    private MainComponent: MainComponent,
    private Reportdialog: DialogService,
    private Reportmsg: MessageService,
    private Prilozhenie60NewService: Prilozhenie60NewService,
    private sanitizer: DomSanitizer,
    private authservice: AuthService
  ) {
    this.profileuser = this.MainComponent.profileuser
    this.host = this.authservice.host;
  }
  type_report: ''
  url: any = ''
  isLoading: boolean = false;
  _organization = {
    'id': 0,
    'name': ''
  }
  profileuser: profileuser
  _date: Date = new Date;
  _date_min: Date;
  _date_max: Date;
  prilozhenieType: any = []
  reportLanguages: any = []
  dimension: any = []
  prilozhenieValue = 'prilozhenie60'
  godUcheta = 0
  languageValue = 'kz'
  dimensionValue = 1
  tochnost = 0
  byOrg: false
  koeff_1_year_110_130 = 0
  koeff_1_year_140 = 0
  koeff_1_year_150 = 0
  koeff_1_year_160 = 0
  koeff_2_year_110_130 = 0
  koeff_2_year_140 = 0
  koeff_2_year_150 = 0
  koeff_2_year_160 = 0
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

  ngOnInit(): void {
    
    this._date_min = new Date(this._date.getFullYear(), 0, 1)
    this.godUcheta = Number(new Date(this._date.getFullYear()))
    this._date_max = this._date
    this._organization = {
      id: parseInt(this.profileuser.org_id),
      name: this.profileuser.org_name
    }
    this.prilozhenieType = [
      { label: 'Приложение 60', value: 'prilozhenie60' },
      { label: 'Приложение 61', value: 'prilozhenie61' }
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
    this.isLoading = true;
    let params = {
      org_id: this._organization.id,
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
      koeff_2_year_160: this.koeff_2_year_160,
    }
  
    

    if (this._organization.id == 0) {
      this.Reportmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию' })
      return
    }
    if (this.prilozhenieValue == 'prilozhenie60') {
      this.Prilozhenie60NewService
        .getReport60(params)
        .subscribe
        (data => {
          let bibon: any = data
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + bibon.status);
        })
    }
    else if (this.prilozhenieValue == 'prilozhenie61') {
      this.Prilozhenie60NewService
        .getReport61(params)
        .subscribe
        (data => {
          let bibon: any = data
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.host + bibon.status);
        })
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 5000)
    
  }

  toLocaleDate(dateForStr: Date) {
    return new Date(dateForStr).toLocaleDateString();
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

  selectProgram() {
    this.ReportProgramref = this.ReportProgramdialog.open(SelectProgramComponent,
      {
        header: 'Список программ',
        width: '80%',
        height: '80%',
        data: { program: this._program, abp_id: this._abp.id }
      })

    this.ReportProgramref.onClose.subscribe((select: any) => {
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
        // this._organization.id = org.id,
        //     this._organization.name = org.name_rus
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

  changePrilozhenie() {
    this.url = ''
  }

  closeform() {
    this.closeEvent.emit()
  }

}
