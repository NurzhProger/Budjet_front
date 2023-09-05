import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { programmService } from '../programm.services';
import { programm_detail, programm_select } from '../interfaces';

@Component({
  selector: 'app-programm-select',
  templateUrl: './programm-select.component.html',
  styleUrls: ['./programm-select.component.css']
})
export class ProgrammSelectComponent implements OnInit {

  constructor(
    private programmSelectService: programmService,
    private programmSelectref: DynamicDialogRef,
    private programmSelectconfirm: ConfirmationService,
    private programmSelectdialog: DialogService,
    private programmSelectmessage: MessageService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  Prog$: Observable<programm_select>
  searchfuncPr = ''
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
      offset: this.first.toString()
    }

    this.Prog$ = this.programmSelectService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchPr()
  }

  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(programm_detail: programm_detail) {

  }
  onSelected(programm_detail: programm_detail) {
    if (!this.selected) {
      this.programmSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите программу!' })
      return
    }
    this.programmSelectref.close(programm_detail)
  }

  search() {

  }

}
