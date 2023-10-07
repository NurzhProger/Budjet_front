import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorySotrService } from '../category-sotr.service';
import { category_sotr_list, category_sotr_element } from '../interfaces';
import { Observable } from 'rxjs';
import { CategorySotrElementComponent } from '../category-sotr-element/category-sotr-element.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-category-sotr-list',
  templateUrl: './category-sotr-select.component.html',
  styleUrls: ['./category-sotr-select.component.css']
})
export class CategorySotrSelectComponent implements OnInit {

  constructor(
    private categorySotrService: CategorySotrService,
    private category_sotr_dialog_ref: DynamicDialogRef,
    private category_sotr_dialog_servis: DialogService,
    private grconfig: DynamicDialogConfig,
    private category_message_service: MessageService
  ) {}

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  category_sotrs$: Observable<category_sotr_list>
  first = 0
  rows = 25
  searchorg = ''
  selected: any
  windowHeight: number 

  ngOnInit(): void {
    
    if (this.grconfig.data) {
      this.data = this.grconfig.data.etogruppa;
    }
     
    this.fetchList()
    this.updateWindowSize() 
        
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.category_sotr_dialog_ref = this.category_sotr_dialog_servis.open(CategorySotrElementComponent,
      {
        header: 'Создание категории сотрудников',
        width: '60%',
        height: '60%',
        data: { category_id: 0 }
      })

    this.category_sotr_dialog_ref.onClose.subscribe((save: boolean) => {
      
      if (save) {
        this.fetchList()
      }
    })
  }

  
  onSelected(category_sotrs:category_sotr_element) {
    if (!this.selected) {
    this.category_message_service.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите категорию!' })
    return
    }
    this.category_sotr_dialog_ref.close(category_sotrs)
    }

  onRowClick(category_sotrs: category_sotr_element) {
      
    if (this.grconfig.data) {
      this.category_sotr_dialog_ref.close(category_sotrs)
    }

    else if (this.data) {
      this.onRowEdit(category_sotrs)
    }
    else {
      this.category_sotr_dialog_ref.close(category_sotrs) 
    }
  }

  onRowEdit(category_sotrs: category_sotr_element) {
    this.category_sotr_dialog_ref = this.category_sotr_dialog_servis.open(CategorySotrElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { category_id: category_sotrs.id }
      })

    this.category_sotr_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }

  search() {

  }

  fetchList() {
    
    let params = {
      etogruppa: !this.data,      
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.category_sotrs$ = this.categorySotrService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit()
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }
 

}
