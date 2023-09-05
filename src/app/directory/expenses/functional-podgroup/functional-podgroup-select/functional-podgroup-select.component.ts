import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { FuncPodgroupService } from '../func-podgroup.services';
import { func_podgroup_detail, func_podgroup_select } from '../interfaces';
import { FunctionalPodgroupDetailComponent } from '../functional-podgroup-detail/functional-podgroup-detail.component';

@Component({
  selector: 'app-functional-podgroup-select',
  templateUrl: './functional-podgroup-select.component.html',
  styleUrls: ['./functional-podgroup-select.component.css']
})
export class FunctionalPodgroupSelectComponent implements OnInit {

  constructor(
    private funcpodGrService: FuncPodgroupService,
    private funcpodGrref: DynamicDialogRef,
    private funcpodGrconfirm: ConfirmationService,
    private funcpodGrSelectdialog: DialogService,
    private funcpodGrSelectmessage: MessageService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  funcpodGr$: Observable<func_podgroup_select>
  searchfuncpodGr = ''
  first = 0
  rows = 25
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchGr(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }
  
  fetchGr() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }

    this.funcpodGr$ = this.funcpodGrService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchGr()
  }

  onRowClick(func_detail: func_podgroup_detail) {
    this.funcpodGrref.close(func_detail)
  }

  onSelected(funcpodGr: func_podgroup_detail) {
    if (!this.selected) {
      this.funcpodGrSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию!' })
      return
    }
    this.funcpodGrref.close(funcpodGr)
  }

  closeform() {
    this.closeEvent.emit()
  }

  search() {

  }

}
