import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategorySotrService } from '../category-sotr.service';
import { category_sotr_list, category_sotr_element } from '../interfaces';
import { Observable } from 'rxjs';
import { CategorySotrElementComponent } from '../category-sotr-element/category-sotr-element.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { log } from 'mathjs';


@Component({
  selector: 'app-category-sotr-select',
  templateUrl: './category-sotr-select.component.html',
  styleUrls: ['./category-sotr-select.component.css']
})
export class CategorySotrSelectComponent implements OnInit {

  constructor(
    private categorySotrService: CategorySotrService,
    private category_sotr_dialog_ref: DynamicDialogRef,
    private category_sotr_dialog_servis: DialogService,
    private grconfig: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  @Output() closeEvent = new EventEmitter<any>()
  @Input() data = false
  category_sotrs$: Observable<category_sotr_list>
  first = 0
  rows = 25
  searchorg = ''
  selected: category_sotr_element
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

 

  onSelected(category:category_sotr_element) {
    if (!this.selected) {
      this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите категорию!' })
    return
    }
      this.category_sotr_dialog_ref.close(category)
    }

  onRowClick(category: category_sotr_element) {
      
    // if (this.grconfig.data) {
    //   this.category_sotr_dialog_ref.close(category)
    // }

     if (this.data) {
      this.onRowEdit(category)
    }
    else {
      this.category_sotr_dialog_ref.close(category) 
    }
  }

  setclass(roww: any){
    // console.log(this.selected, roww);
    if (this.selected && roww.id == this.selected.id){
      return 'blue-class'
    }
    else{
    return ''}
    
    // if (roww == this.selected)
  }

  onRowEdit(category: category_sotr_element) {
    this.category_sotr_dialog_ref = this.category_sotr_dialog_servis.open(CategorySotrElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { category_id: category.id }
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
      etogruppa: this.data,      
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
