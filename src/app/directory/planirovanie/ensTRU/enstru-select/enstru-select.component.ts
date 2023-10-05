import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { Observable } from 'rxjs';
import { ensTRU_element, ensTRU_list, ensTRU_select } from '../interfaces';
import { EnsTRUService } from '../enstru.service';
import { EnstruElementComponent } from '../enstru-element/enstru-element.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipTruService } from 'src/app/enums/tip_tru/tip-tru/tiptru.service';
import { MessageService } from 'primeng/api';
import { log } from "mathjs";


@Component ({
    selector: 'app-enstru-select',
    templateUrl: './enstru-select.component.html',
    styleUrls: ['./enstru-select.component.css']
})

export class EnstruSelectComponent implements OnInit {

    @Input() Data = false
    @Output() closeEvent = new EventEmitter<any>()

    tip_tru: Observable<ensTRU_select>
    windowHeight: number
    selected: any
    first = 0
    rows = 25
    enstru: any
    pageEvent: number = 1;
    searchENS: string = '';
    tip_options: any =[];
    otbor_tip: string = ''
  constructor(
    private EnsTRUService: EnsTRUService,
    private ensTRU_dialog_ref: DynamicDialogRef,
    private ensTRU_dialog_servis: DialogService,
    private TipTruService: TipTruService,
    private messageServiceadd: MessageService
    
    ) { }
  ngOnInit(): void {
    this.fetchENS()
    this.updateWindowSize(),
    this.selectTip()
    }


  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
    }


  selectTip() {
    let responce: any;
    this.TipTruService.fetch().subscribe(
    (data) => (responce = data, this.tip_options = responce.results
     ),
    (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
    }

    enstru$: Observable<ensTRU_select>

  onValueChange(newValue: string) {
    this.otbor_tip = newValue
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchENS: this.searchENS,
      tip_tru: this.otbor_tip,
     }
      this.enstru$ = this.EnsTRUService.fetch(params);
    }


 

  onSelected(enstru:ensTRU_element) {
    if (!this.selected) {
    this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ЕНСТРУ!' })
    return
    }
    this.ensTRU_dialog_ref.close(enstru)
    }


  fetchENS() {
    let params = {
    limit: this.rows.toString(),
    offset: this.first.toString(),
    searchENS: this.searchENS
    }
        
    this.enstru$ = this.EnsTRUService.fetch(params)
    }

  onRowClick(enstru: ensTRU_element) {
    this.ensTRU_dialog_ref.close(enstru)
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchENS()
  }
}