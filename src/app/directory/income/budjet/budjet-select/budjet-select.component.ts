import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Budjet_select , Budjet_detail} from '../interfaces';
import { Budjet_Service } from '../budjet.servise';
import { Observable } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-budjet-select',
  templateUrl: './budjet-select.component.html',
  styleUrls: ['./budjet-select.component.css']
})
export class BudjetSelectComponent implements OnInit {

  constructor(
    private budjet_Service: Budjet_Service,
    private dialog_ref: DynamicDialogRef,
    private budjetmessage: MessageService
    ) { }

  @Output() closeEvent = new EventEmitter<any>()

  Budjet$: Observable<Budjet_select>
  first = 0
  rows = 25
  last = 3
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchbudjet(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }

  closeform() {
    this.closeEvent.emit()
  }

  fetchbudjet() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.Budjet$ = this.budjet_Service.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchbudjet()
  }

  selectBudjet(Budjet_detail: Budjet_detail) {
    this.dialog_ref.close(Budjet_detail);
  }
  
  onSelected(Budjet_detail: Budjet_detail) {
    if (!this.selected) {
      this.budjetmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите бюджет!' })
      return
    }
    this.dialog_ref.close(Budjet_detail)
  }

}
