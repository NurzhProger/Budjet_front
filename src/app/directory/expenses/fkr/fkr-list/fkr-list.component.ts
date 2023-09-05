import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { fkrService } from '../fkr.services';
import { fkr_detail, fkr_list } from '../interfaces';

@Component({
  selector: 'app-fkr-list',
  templateUrl: './fkr-list.component.html',
  styleUrls: ['./fkr-list.component.css']
})
export class FkrListComponent implements OnInit {

  constructor(
    private fkrListService: fkrService,
    private fkrListref: DynamicDialogRef,
    private fkrListconfirm: ConfirmationService,
    private fkrListdialog: DialogService,
    private fkrListmessage: MessageService,
  ) { }
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  fkr$: Observable<fkr_list>
  searchfkr = ''
  first = 0
  rows = 25
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchPr(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  fetchPr() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searchfkr.toString()
    }

    this.fkr$ = this.fkrListService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchPr()
  }

  onRowClick(fkr_detail: fkr_detail) {
    this.fkrListref.close(fkr_detail)
  }

  closeform() {
    this.closeEvent.emit()
  }

  search() {

  }

}
