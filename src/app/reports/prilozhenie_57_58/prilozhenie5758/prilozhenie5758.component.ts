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

@Component({
  selector: 'app-prilozhenie5758',
  templateUrl: './prilozhenie5758.component.html',
  styleUrls: ['./prilozhenie5758.component.css']
})
export class Prilozhenie5758Component implements OnInit {
  @Output() closeEvent = new EventEmitter<any>()
  constructor(
    private Reportref: DynamicDialogRef,
    private Reportdialog: DialogService,
    private MainComponent: MainComponent,
    private Reportmsg: MessageService,
    private Prilozhenie5758Service: Prilozhenie5758Service,
    private sanitizer: DomSanitizer,
  ) { this.profileuser = this.MainComponent.profileuser }
  profileuser: profileuser
  prilozhenieType: any = []
  url: any = ''
  prilozhenieValue = 'prilozhenie57'
  _organization = {
    'id': 0,
    'name': ''
  }
  _date: Date = new Date;
  _fkr = {
    'id': 0,
    'name': '',
    'code': ''
  }
  ngOnInit(): void {
    this._organization = {
      id: parseInt(this.profileuser.org_id),
      name: this.profileuser.org_name
    }
    this.prilozhenieType = [
      { label: 'Приложение 57', value: 'prilozhenie57' },
      { label: 'Приложение 58', value: 'prilozhenie58' }
    ]
  }

  form() {
    let params = {
      org_id: this._organization.id,
      fkr_id: this._fkr.id,
      _date:this.toLocaleDate(this._date)
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
          let blob: Blob = new Blob([data], { type: 'application/pdf' });
          let url = window.URL.createObjectURL(blob);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        })
      // console.log(this.prilozhenieType.value);

    }
    else if (this.prilozhenieValue == 'prilozhenie58') {
      this.Prilozhenie5758Service
        .getReport58(params)
        .subscribe
        (data => {
          let blob: Blob = new Blob([data], { type: 'application/pdf' });
          let url = window.URL.createObjectURL(blob);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        })
      //  console.log(this.prilozhenieType.value);

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

  changePrilozhenie() {
    this.url = ''
    console.log(this.prilozhenieValue);
  }

  closeform() {
    this.closeEvent.emit();
  }


}
