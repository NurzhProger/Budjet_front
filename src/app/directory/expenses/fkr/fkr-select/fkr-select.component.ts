import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { fkrService } from '../fkr.services';
import { fkr_detail, fkr_select } from '../interfaces';

@Component({
  selector: 'app-fkr-select',
  templateUrl: './fkr-select.component.html',
  styleUrls: ['./fkr-select.component.css'],
  template: `<p>Height: {{windowHeight}}px</p>`
})
export class FkrSelectComponent implements OnInit {

  constructor(
    private fkrSelectService: fkrService,
    private fkrSelectref: DynamicDialogRef,
    private fkrSelectconfirm: ConfirmationService,
    private fkrSelectdialog: DialogService,
    private fkrSelectmessage: MessageService,
  ) { }
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  fkr$: Observable<fkr_select>
  searchfkr = ''
  first = 0
  rows = 25
  selected: any
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
    this.windowHeight = window.innerHeight * 0.8;
  }

  fetchPr() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searchfkr.toString()
    }

    this.fkr$ = this.fkrSelectService.fetch(params)
  }

  onSelected(fkrr: fkr_detail) {
    if (!this.selected) {
      this.fkrSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите категорию!' })
      return
    }
    this.fkrSelectref.close(fkrr)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchPr()
  }

  onRowClick(fkr_detail: fkr_detail) {
    this.fkrSelectref.close(fkr_detail)
  }

  closeform() {
    this.closeEvent.emit()
  }

  search() {

  }

}
