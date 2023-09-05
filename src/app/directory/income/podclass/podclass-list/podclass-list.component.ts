import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { podclassService } from "../podclass_servise";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { podclass_interfaces, podclass_interfaces_detail } from "../podclass_interfaces";
import { PodclassDetailComponent } from "../podclass-detail/podclass-detail.component"
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-podclass-list',
  templateUrl: './podclass-list.component.html',
  styleUrls: ['./podclass-list.component.css']
})
export class PodclassListComponent implements OnInit {

  constructor(
    private podclassService: podclassService,
    private podclassryref: DynamicDialogRef,
    private messageServicedelSelect: MessageService,
    private podclasslistdialog: DialogService) { }

  podclass$: Observable<podclass_interfaces>
  NewCat: podclass_interfaces_detail = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: ''
  }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  searchpodclass = ''
  first = 0
  rows = 25
  last = 3
  selected: any
  windowHeight: number
  // items = ["5","10","20","30","50"]
  // selectedItem = 'Количество строк'

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }
  
  ngOnInit(): void {
    this.fetchCat(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  closeform() {
    this.closeEvent.emit()
  }

  fetchCat() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searchpodclass.toString()
    }

    this.podclass$ = this.podclassService.fetch(params)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchCat()
  }

  onSelected(podclass: podclass_interfaces_detail) {
    if (!this.selected) {
      this.messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите подкласс!' })
      return
    }
    this.podclassryref.close(podclass)
  }

  onRowClick(podclass: podclass_interfaces_detail) {
    if (this.data) {
      this.onRowEdit(podclass)
    }
    else {
      this.podclassryref.close(podclass)
    }
  }

  onRowEdit(podclass: podclass_interfaces_detail) {

    this.podclassryref = this.podclasslistdialog.open(PodclassDetailComponent,
      {
        header: 'Редактирование подкласса',
        width: '60%',
        height: '40%',
        data: { podclass: podclass }
      });
  }

  openNew() {

    this.NewCat = {
      id: 0,
      code: '',
      name_kaz: '',
      name_rus: ''
    }

    this.podclassryref = this.podclasslistdialog.open(PodclassDetailComponent,
      {
        header: 'Создание подкласса',
        width: '60%',
        height: '40%',
        data: { podclass: this.NewCat }
      })
  }

}
