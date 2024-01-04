import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { podprogrammService } from '../podprogramm.services';
import { podprogramm_detail, podprogramm_select } from '../interfaces';
import { PodprogrammDetailComponent } from '../podprogramm-detail/podprogramm-detail.component';

@Component({
  selector: 'app-podprogramm-select',
  templateUrl: './podprogramm-select.component.html',
  styleUrls: ['./podprogramm-select.component.css']
})
export class PodprogrammSelectComponent implements OnInit {

  constructor(
    private podprSelectService: podprogrammService,
    private podprSelectref: DynamicDialogRef,
    private podprSelectconfirm: ConfirmationService,
    private podprSelectdialog: DialogService,
    private podprSelectmessage: MessageService,
  ) { }
  
  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  podProg$: Observable<podprogramm_select>
  search = ''
  first = 0
  rows = 25
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchpodPr(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }
  

  fetchpodPr() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search
    }

    this.podProg$ = this.podprSelectService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchpodPr()
  }

  onSelected(podprogramm_detail: podprogramm_detail) {
    if (!this.selected) {
      this.podprSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите подпрограммму!' })
      return
    }
    this.podprSelectref.close(podprogramm_detail)
  }

  onRowClick(podprogramm_detail: podprogramm_detail) {
    this.podprSelectref.close(podprogramm_detail)
  }

  closeform() {
    this.closeEvent.emit()
  }

  searh() {

  }

}
