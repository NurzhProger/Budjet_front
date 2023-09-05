import { Component, OnInit } from '@angular/core';
import { koeff_category_element } from '../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategorySotrListComponent } from '../../category-sotr/category-sotr-list/category-sotr-list.component';
import { StazhCategoryListComponent } from '../../stazh-category/stazh-category-list/stazh-category-list.component';
import { category_sotr_element } from '../../category-sotr/interfaces';
import { stazh_category_element } from '../../stazh-category/interfaces';
import { KoeffCategoryService } from '../koeff-category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-koeff-element',
  templateUrl: './koeff-element.component.html',
  styleUrls: ['./koeff-element.component.css']
})
export class KoeffElementComponent implements OnInit {

  constructor(
    private category_dialog_select: DynamicDialogRef,
    private stazh_dialog_select: DynamicDialogRef,
    private categorySelectdialogService: DialogService,
    private koeffCategoryService: KoeffCategoryService,
    private koef_category_massage: MessageService,
    private koeff_category_dialog_ref: DynamicDialogRef,
    private stazhSelectdialogService: DialogService,
    private koeff_category_dialog_config: DynamicDialogConfig
  ) {}

  koeff_category_element: koeff_category_element = {
    id: 0,
    period: '',
    koefficient: 0,
    _category: 0,
    category_name: '',
    _stazh: 0,
    stazh_name: ''
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      period: new FormControl(null, [Validators.required]),
      category: new FormControl(),
      stazh: new FormControl(),
      koeff: new FormControl()
    })
    this.koeff_category_element.id = this.koeff_category_dialog_config.data.koeff_id;
    if (this.koeff_category_element.id !== 0) {
      this.koeffCategoryService.fetchKoeff(this.koeff_category_element.id)
        .subscribe(
          (data) => (
              this.koeff_category_element = data
            )
        )
    }
  }


  selectCategory() {
    this.category_dialog_select = this.categorySelectdialogService.open(CategorySotrListComponent,
      {
          header: 'Выбор категории должности',
          width: 'calc(60%)',
          height: 'calc(80%)',
          data: {etogruppa: true}
      })
    this.category_dialog_select.onClose.subscribe((category: category_sotr_element) => {
      if (category) {
        this.koeff_category_element._category = category.id;
        this.koeff_category_element.category_name = category.name;
      }
      })
  }

  selectStazh() {
    this.stazh_dialog_select = this.stazhSelectdialogService.open(StazhCategoryListComponent,
      {
          header: 'Выберите стаж',
          width: 'calc(60%)',
          height: 'calc(80%)',
      })
    this.stazh_dialog_select.onClose.subscribe((stazh: stazh_category_element) => {
      if (stazh) {
        this.koeff_category_element._stazh = stazh.id;
        this.koeff_category_element.stazh_name = stazh.name;
      }
    })
  }

  saveKoeff() {
    if (this.koeff_category_element.id == 0){      
      this.koeffCategoryService.add(this.koeff_category_element)
        .subscribe(
          (data) => (
            this.koef_category_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Коэффициент сохранен!' })
          ),
          (error) => (this.koef_category_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    else {
          this.koeffCategoryService.edit(this.koeff_category_element)
          .subscribe((data) => (
            this.koef_category_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Коэффициент сохранен!' })
          ),
          (error) => (this.koef_category_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeKoeff(true);
  }

  closeKoeff(save: boolean) {
    this.koeff_category_dialog_ref.close(save);
  }

  clearCategory() {
    this.koeff_category_element._category = 0;
    this.koeff_category_element.category_name = '';
  }

  clearStazh() {
    this.koeff_category_element._stazh = 0;
    this.koeff_category_element.stazh_name = '';
  }

}
