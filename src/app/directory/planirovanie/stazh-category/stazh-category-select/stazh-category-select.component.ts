import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { stazh_category_element, stazh_category_list } from '../interfaces';
import { StazhCategoryElementComponent } from '../stazh-category-element/stazh-category-element.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StazhCategoryService } from '../stazh-category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stazh-category-select',
  templateUrl: './stazh-category-select.component.html',
  styleUrls: ['./stazh-category-select.component.css']
})
export class StazhCategorySelectComponent implements OnInit {
  constructor(
    private stazhCategoryService: StazhCategoryService,
    private stazh_category_dialog_ref: DynamicDialogRef,
    private stazh_category_dialog_servis: DialogService,
    private stazh_category_message_servis: MessageService,
    private stazh_category_config: DynamicDialogConfig
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  stazh_categorys$: Observable<stazh_category_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  searchSta = ''
  stazh: any
  id_category: 0

  ngOnInit(): void {
    this.id_category = this.stazh_category_config.data.category_id;
    if (this.id_category !== 0) {
      this.fetchStazhOtbor()
    } else {
      this.fetchSta()
    }
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  fetchStazhOtbor() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchSta: this.searchSta,
      _category_id: this.id_category
    }
    this.stazh_categorys$ = this.stazhCategoryService.fetchWithOtbor(params);
  }

  fetchSta() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      searchSta: this.searchSta
    }
    this.stazh_categorys$ = this.stazhCategoryService.fetch(params);
  }

  onSelected(stazh: stazh_category_element) {
    if (!this.selected) {
      this.stazh_category_message_servis.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите стажа!' })
      return
    }
    this.stazh_category_dialog_ref.close(stazh)
  }

  onRowClick(stazh: stazh_category_element) {
    this.stazh_category_dialog_ref.close(stazh)
  }

  onRowEdit(stazh: stazh_category_element) {
    this.stazh_category_dialog_ref = this.stazh_category_dialog_servis.open(StazhCategoryElementComponent,
      {
        header: 'Редактирование стажа категории',
        width: '60%',
        height: '60%',
        data: { stazh_id: stazh.id }
      })
    this.stazh_category_dialog_ref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.fetchSta()
      }
    })
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchSta()
  }
}
