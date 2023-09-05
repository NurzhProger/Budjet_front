import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { stazh_category_element, stazh_category_list } from '../interfaces';
import { StazhCategoryElementComponent } from '../stazh-category-element/stazh-category-element.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StazhCategoryService } from '../stazh-category.service';

@Component({
  selector: 'app-stazh-category-list',
  templateUrl: './stazh-category-list.component.html',
  styleUrls: ['./stazh-category-list.component.css']
})
export class StazhCategoryListComponent implements OnInit {

  constructor(
    private stazhCategoryService: StazhCategoryService,
    private stazh_category_dialog_ref: DynamicDialogRef,
    private stazh_category_dialog_servis: DialogService
  ) { }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  stazh_categorys$: Observable<stazh_category_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.stazh_category_dialog_ref = this.stazh_category_dialog_servis.open(StazhCategoryElementComponent,
      {
        header: 'Создание стажа',
        width: '60%',
        height: '60%',
        data: { stazh_id: 0 }
      })

      this.stazh_category_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.stazh_categorys$ = this.stazhCategoryService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(stazh: stazh_category_element) {
    if (this.data) {
      this.onRowEdit(stazh)
    }
    else {
      this.stazh_category_dialog_ref.close(stazh)
    }
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
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
        this.fetchList()
      }
    })
  }

}
