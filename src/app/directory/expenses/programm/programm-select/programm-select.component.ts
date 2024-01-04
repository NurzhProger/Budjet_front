import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
    private select_config: DynamicDialogConfig
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  Prog$: Observable<programm_select>
  search = ''
  first = 0
  rows = 25
  selected: any
  windowHeight: number
  abp_id: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.abp_id = this.select_config.data.abp_id

    this.fetchPr(),
      this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }


  fetchPr() {
    let params = {
      abp_id: this.abp_id,
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search
    }
    console.log(params);


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

  searh() {

  }

}
