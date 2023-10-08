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

@Component({
  selector: 'app-prilozhenie60-new',
  templateUrl: './prilozhenie60-new.component.html',
  styleUrls: ['./prilozhenie60-new.component.css']
})
export class Prilozhenie60NewComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>()
  constructor(
    private Reportref: DynamicDialogRef,
    private MainComponent: MainComponent,
    private Reportdialog: DialogService,
    private Reportmsg: MessageService,
    private Prilozhenie60NewService: Prilozhenie60NewService,
    private sanitizer: DomSanitizer,
  ) { this.profileuser = this.MainComponent.profileuser }
  type_report: ''
  url: any = ''
  _organization = {
    'id': 0,
    'name': ''
  }
  profileuser: profileuser

  ngOnInit(): void {

    this._organization = {
      id: parseInt(this.profileuser.org_id),
      name: this.profileuser.org_name
    }
  }

  form() {
    let params = {
      org_id: this._organization.id,
    }

    if (this._organization.id == 0) {
      this.Reportmsg.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию' })
      return
    } else {
      this.Prilozhenie60NewService
        .getReport(params)
        .subscribe
        (data => {
          let blob: Blob = new Blob([data], { type: 'application/pdf' });
          let url = window.URL.createObjectURL(blob);
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        })
    }
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

  closeform() {
    this.closeEvent.emit()
  }

}
