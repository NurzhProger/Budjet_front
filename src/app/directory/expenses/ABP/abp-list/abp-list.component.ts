import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { abpService } from '../abp.services';
import { abp_detail, abp_list } from '../interfaces';
import { ABPDetailComponent } from "../abp-detail/abp-detail.component"

@Component({
  selector: 'app-abp-list',
  templateUrl: './abp-list.component.html',
  styleUrls: ['./abp-list.component.css']
})
export class ABPListComponent implements OnInit {

  constructor(
    private abpListService: abpService,
    private abpListref: DynamicDialogRef,
    private abpListconfirm: ConfirmationService,
    private abpListdialog: DialogService,
    private abpListmessage: MessageService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  
  abp_list$: Observable<abp_list>
  search = ''
  first = 0
  rows = 25
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchABP(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  fetchABP() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search
    }

    this.abp_list$ = this.abpListService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchABP()
  }

  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(abp_detail: abp_detail) {
    this.abpListref = this.abpListdialog.open(ABPDetailComponent,
      {
        header: 'Редактирование АБП',
        width: '60%',
        height: '40%',
        data: { abp_list: abp_detail }
      });
  }

  searh() {

  }



}
