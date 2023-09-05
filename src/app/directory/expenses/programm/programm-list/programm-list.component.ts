import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { programmService } from '../programm.services';
import { programm_detail, programm_list } from '../interfaces';

@Component({
  selector: 'app-programm-list',
  templateUrl: './programm-list.component.html',
  styleUrls: ['./programm-list.component.css']
})
export class ProgrammListComponent implements OnInit {

  constructor(
    private programmListService: programmService,
    private programmListref: DynamicDialogRef,
    private programmListconfirm: ConfirmationService,
    private programmListdialog: DialogService,
    private programmListmessage: MessageService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  Prog$: Observable<programm_list>
  searchfuncPr = ''
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
      offset: this.first.toString()
    }

    this.Prog$ = this.programmListService.fetch(params)
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

  search() {

  }

}
