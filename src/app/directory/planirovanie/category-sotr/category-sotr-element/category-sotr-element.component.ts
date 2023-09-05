import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category_sotr_element } from '../interfaces';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategorySotrService } from '../category-sotr.service';
import { MessageService } from 'primeng/api';
import { CategorySotrListComponent } from '../category-sotr-list/category-sotr-list.component';

@Component({
  selector: 'app-category-sotr-element',
  templateUrl: './category-sotr-element.component.html',
  styleUrls: ['./category-sotr-element.component.css']
})
export class CategorySotrElementComponent implements OnInit {

  constructor(
    private category_sotr_dialog_ref: DynamicDialogRef,
    private category_sotr_dialog_select: DynamicDialogRef,
    private categorySotrService: CategorySotrService,
    private category_sotr_massage: MessageService,
    public category_sotr_dialog_config: DynamicDialogConfig,
    private parentSelectdialogService: DialogService,
  ) {}

  form: FormGroup
  saved = false;
  category_list: CategorySotrListComponent
  
  category_sotr_element: category_sotr_element = {
    id: 0,
    name: '',
    deleted: '',
    parent_name: '',
    parent: 0,
    group: false
  }
  directory_options = [
    { label: 'Да', value: true },
    { label: 'Нет', value: false }
];

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      parent: new FormControl(),
      group: new FormControl()
    })
    this.category_sotr_element.id = this.category_sotr_dialog_config.data.category_id;
    
    if (this.category_sotr_element.id !== 0) {
      this.categorySotrService.fetchCategory(this.category_sotr_element.id)
        .subscribe(
          (data) => (
              this.category_sotr_element = data
            )
        )
    }
    
  }

  saveCategory() {
    
    if (this.category_sotr_element.id == 0){      
    this.categorySotrService.add(this.category_sotr_element)
      .subscribe(
        (data) => (
          this.category_sotr_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Категория сотрудника сохранена!' })
        ),
        (error) => (this.category_sotr_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
      }
   else {
        this.categorySotrService.edit(this.category_sotr_element)
        .subscribe((data) => (
          this.category_sotr_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Категория сотрудника сохранена!' })
        ),
        (error) => (this.category_sotr_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
      }
  this.closeCategory(true);
  this.category_list.fetchList()
  }

  selectParent() {
    this.category_sotr_dialog_select = this.parentSelectdialogService.open(CategorySotrListComponent,
      {
          header: 'Выбор родителя',
          width: 'calc(60%)',
          height: 'calc(80%)'
      })

  this.category_sotr_dialog_select.onClose.subscribe((parent: category_sotr_element) => {
      if (parent) {
        
        this.category_sotr_element.parent = parent.id;
        this.category_sotr_element.parent_name = parent.name;
            
      }
  })
  }

  closeCategory(save: boolean) {
    this.category_sotr_dialog_ref.close(save)
  }

  clearParent() {
    this.category_sotr_element.parent = 0;
    this.category_sotr_element.parent_name = '';
  }

}
