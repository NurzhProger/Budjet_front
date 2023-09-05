import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { organization_select, organization_detail } from '../interfaces';
import { OrganizationsService } from '../organization.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationDetailComponent } from '../organization-detail/organization-detail.component'
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-organization-select',
  templateUrl: './organization-select.component.html',
  styleUrls: ['./organization-select.component.css']
})
export class OrganizationSelectComponent implements OnInit {

  constructor(
    private orgService: OrganizationsService,
    private org_dialog_ref: DynamicDialogRef,
    private messageServicedelSelect: MessageService,
    private org_dialog_servis: DialogService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  organizations$: Observable<organization_select>
  first = 0
  rows = 25
  searchorg = ''
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit() {
    this.fetchOrg(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }

  closeform() {
    this.closeEvent.emit()
  }

  fetchOrg() {

    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }

    this.organizations$ = this.orgService.fetch(params)

  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchOrg()
  }

  onRowEdit(org: organization_detail) {

    this.org_dialog_ref = this.org_dialog_servis.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '60%',
        data: { org_id: org.id }
      })

    this.org_dialog_ref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchOrg()
      }
    })

  }

  onRowClick(org: organization_detail) {
    if (this.data) {
      this.onRowEdit(org)
    }
    else {
      this.org_dialog_ref.close(org)
    }
  }

  onSelected(org: organization_detail) {
    if (!this.selected) {
      this.messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию!' })
      return
    }
    this.org_dialog_ref.close(org)
  }

  search() {

  }

  openNew() {
    this.org_dialog_ref = this.org_dialog_servis.open(OrganizationDetailComponent,
      {
        header: 'Создание организации',
        width: '60%',
        height: '60%',
        data: { org_id: 0 }
      })

    this.org_dialog_ref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchOrg()
      }
    })

  }

}
