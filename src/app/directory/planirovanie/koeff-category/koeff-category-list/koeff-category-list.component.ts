import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { koeff_category_element, koeff_category_list } from '../interfaces';
import { KoeffCategoryService } from '../koeff-category.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { KoeffElementComponent } from '../koeff-element/koeff-element.component';

@Component({
  selector: 'app-koeff-category-list',
  templateUrl: './koeff-category-list.component.html',
  styleUrls: ['./koeff-category-list.component.css']
})
export class KoeffCategoryListComponent implements OnInit {

  
  constructor(
    private koeffCategoryService: KoeffCategoryService,
    private dialog_ref: DynamicDialogRef,
    private koeff_category_dialog_servis: DialogService,
    private koeff_category_dialog_ref: DynamicDialogRef
  ) {}

  @Output() closeEvent = new EventEmitter<any>()  
  @Input() data = false
  koeff_category$: Observable<koeff_category_list>

  searchkoeff = ''
  first = 0
  rows = 25
  windowHeight: number 
  selected: any

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize()    
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.dialog_ref = this.koeff_category_dialog_servis.open(KoeffElementComponent,   
      {
        header: 'Создание коэффициента',
        width: '60%',
        height: '60%',
        data: { koeff_id: 0 }
      })

    this.dialog_ref.onClose.subscribe((save: boolean) => {
      
      if (save) {
        this.fetchList()
      }
    })
  }

  search() {

  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.koeff_category$ = this.koeffCategoryService.fetch(params);  
  }

  closeform() {
    this.closeEvent.emit()
  }

  onRowClick(koeff: koeff_category_element) {
    if (this.data) {
      this.onRowEdit(koeff)
    }
    else {
      this.koeff_category_dialog_ref.close(koeff) 
    }
  }

  onRowEdit(koeff: koeff_category_element) {
    this.koeff_category_dialog_ref = this.koeff_category_dialog_servis.open(KoeffElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { koeff_id: koeff.id }
      })

    this.koeff_category_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }
}
