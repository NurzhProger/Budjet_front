import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { FuncGroupService } from '../func-group.services';
import { func_group_detail, func_group_select } from '../interfaces';
import { FunctionalGroupDetailComponent } from "../functional-group-detail/functional-group-detail.component"
@Component({
  selector: 'app-functional-group-select',
  templateUrl: './functional-group-select.component.html',
  styleUrls: ['./functional-group-select.component.css']
})
export class FunctionalGroupSelectComponent implements OnInit {

  constructor(
    private funcGrService: FuncGroupService,
    private funcGrref: DynamicDialogRef,
    private funcGrconfirm: ConfirmationService,
    private funcGrSelectdialog: DialogService,
    private funcGrSelectmessage: MessageService,
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  funcGr$: Observable<func_group_select>
  searchfuncGr = ''
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

    this.funcGr$ = this.funcGrService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchGr()
  }

  onRowClick(func_detail: func_group_detail) {

    this.funcGrref.close(func_detail)

  }

  onSelected(func_detail: func_group_detail) {
    if (!this.selected) {
      this.funcGrSelectmessage.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите функциональную группу!' })
      return
    }
    this.funcGrref.close(func_detail)
  }

  search() {

  }

  closeform() {
    this.closeEvent.emit()
  }

}
