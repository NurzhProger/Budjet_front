import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ensTRU_element, ensTRU_list } from '../interfaces';
import { EnsTRUService } from '../enstru.service';
import { EnstruElementComponent } from '../enstru-element/enstru-element.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipTruService } from 'src/app/enums/tip_tru/tip-tru/tiptru.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-enstru-list',
  templateUrl: './enstru-list.component.html',
  styleUrls: ['./enstru-list.component.css']
})
export class EnstruListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  
  tip_tru: Observable<ensTRU_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
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
    this.fetchList(),
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

  onValueChange(newValue: string) {
    this.otbor_tip = newValue
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchENS: this.searchENS,
      tip_tru: this.otbor_tip 
    }
    this.tip_tru = this.EnsTRUService.fetch(params);
  }

  removeOtborTip() {
    this.otbor_tip = ''
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchENS: this.searchENS,
      tip_tru: this.otbor_tip 
    }
    this.tip_tru = this.EnsTRUService.fetch(params);
  }


  

  openNew() {
    this.ensTRU_dialog_ref = this.ensTRU_dialog_servis.open(EnstruElementComponent,
      {
        header: 'Создание доплат и надбавок',
        width: '60%',
        height: '60%',
        data: { doplata_id: 0 }
      })

      this.ensTRU_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchENS: this.searchENS,
      tip_tru: this.otbor_tip 
    }
    this.tip_tru = this.EnsTRUService.fetch(params);
  }
  
  closeform() {
    this.closeEvent.emit();
  }

  onRowClick(tip_tru: ensTRU_element) {
    if (this.data) {
      this.onRowEdit(tip_tru)
    }
    else {
      this.ensTRU_dialog_ref.close(tip_tru) 
    }
  }

  onRowEdit(tip_tru: ensTRU_element) {
    this.ensTRU_dialog_ref = this.ensTRU_dialog_servis.open(EnstruElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { ensTRU_id: tip_tru.id }
      })

    this.ensTRU_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

}
