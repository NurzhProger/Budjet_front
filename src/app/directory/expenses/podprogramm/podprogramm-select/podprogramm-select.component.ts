import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { podprogrammService } from '../podprogramm.services';
import { podprogramm_detail, podprogramm_select } from '../interfaces';
import { PodprogrammDetailComponent } from '../podprogramm-detail/podprogramm-detail.component';
import { forEach, number } from 'mathjs';

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
    private select_config: DynamicDialogConfig
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  podProg$: Observable<podprogramm_select>
  search = ''
  first = 0
  rows = 25
  selected: any
  windowHeight: number
  abp_id: number
  _program: any = []
  program_id: any = []

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.abp_id = this.select_config.data.abp_id
    this._program = JSON.parse(JSON.stringify(this.select_config.data.program))
    // if (this._program.length > 0) {
    //   for (let i = 0; i < this._program.length; i++) {
    //     this.program_id[''].push(this._program[i].id)
    //   }

    // }
    this._program.forEach((element: any) => {
      this.program_id.push(element.id)
    })



    this.fetchpodPr(),
      this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight * 0.8;
  }


  fetchpodPr() {



    let params = {
      abp_id: this.abp_id,
      _program: this.program_id,
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
