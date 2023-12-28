import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category_sotr_detail, category_sotr_element } from '../interfaces';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategorySotrService } from '../category-sotr.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategorySotrListComponent } from '../category-sotr-list/category-sotr-list.component';
import { number, string } from 'mathjs';
import { StazhCategorySelectComponent } from '../../stazh-category/stazh-category-select/stazh-category-select.component';
import { stazh_category_element } from '../../stazh-category/interfaces';

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
    private stazh_dialog_ref: DynamicDialogRef,
    private koeff_dialog_ref: DynamicDialogRef,
    private koef_cate_confirm: ConfirmationService
  ) { }

  form: FormGroup
  saved = false;
  category_list: CategorySotrListComponent
  selected = false;

  category_sotr_element: category_sotr_detail = {
    category_sotrudnikov: {
      id: 0,
      name: '',
      deleted: false,
      parent_name: '',
      parent: 0,
      group: false
    },
    tbl: [{
      id: 0,
      _category: {
        id: 0,
        name: '',
        deleted: false,
        parent_name: '',
        parent: 0,
        group: false
      },
      _stazh: {
        id: 0,
        name: '',
        ot: 0,
        do: 0
      },
      period: '',
      koefficient: 0
    }]
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


    this.category_sotr_element.category_sotrudnikov.id = this.category_sotr_dialog_config.data.category_id;

    if (this.category_sotr_element.category_sotrudnikov.id !== 0) {
      this.categorySotrService.fetchCategory(this.category_sotr_element.category_sotrudnikov.id)
        .subscribe(
          (data) => (
            this.category_sotr_element = data
          )
        )
    }

  }

  saveCategory() {

    if (this.category_sotr_element.category_sotrudnikov.id == 0) {
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

        this.category_sotr_element.category_sotrudnikov.parent = parent.id;
        this.category_sotr_element.category_sotrudnikov.parent_name = parent.name;

      }
    })
  }

  closeCategory(save: boolean) {
    this.category_sotr_dialog_ref.close(save)
  }

  clearParent() {
    this.category_sotr_element.category_sotrudnikov.parent = 0;
    this.category_sotr_element.category_sotrudnikov.parent_name = '';
  }

  addKoeff() {
    this.koeff_dialog_ref = this.parentSelectdialogService.open(StazhCategorySelectComponent,
      {
        header: 'Выбор стажа',
        width: '60%',
        height: '80%',
        data: {
          category_id: 0
        }
      })

    this.koeff_dialog_ref.onClose.subscribe((stazh: stazh_category_element) => {
      let formattedDate = ''
      let today = new Date().toLocaleDateString();
      let parts = today.split(".");
      if (parts.length === 3) {
        let year = parts[2];
        let month = parts[1];
        let day = parts[0];
        formattedDate = `${year}-${month}-${day}`;
      }

      if (stazh) {
        this.category_sotr_element.tbl.push(
          {
            _stazh: {
              id: stazh.id,
              name: stazh.name,
              ot: stazh.ot,
              do: stazh.do
            },
            id: 0,
            koefficient: 0,
            _category: {
              id: this.category_sotr_element.category_sotrudnikov.id,
              name: this.category_sotr_element.category_sotrudnikov.name,
              deleted: this.category_sotr_element.category_sotrudnikov.deleted,
              parent_name: this.category_sotr_element.category_sotrudnikov.parent_name,
              parent: this.category_sotr_element.category_sotrudnikov.parent,
              group: this.category_sotr_element.category_sotrudnikov.group
            },
            period: formattedDate
          })
      }
    })
  }

  viewStazh(stazh_id: number) {

  }

  editStazh(ri: number) {
    this.stazh_dialog_ref = this.parentSelectdialogService.open(StazhCategorySelectComponent,
      {
        header: 'Выбор стажа',
        width: '60%',
        height: '80%',
        data: {
          category_id: 0
        }
      })
    this.stazh_dialog_ref.onClose.subscribe((stazh: stazh_category_element) => {
      if (stazh) {
        this.category_sotr_element.tbl[ri]._stazh = {
          id: stazh.id,
          name: stazh.name,
          ot: stazh.ot,
          do: stazh.do
        }
      }
    })
  }

  onDelete(ri: number) {

    this.koef_cate_confirm.confirm({
      message: 'Удалить коэффициент категории?',
      header: 'Удаление коэффициента категории',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.category_sotr_element.tbl.splice(ri, 1),
          this.category_sotr_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Удален коэфициент категории!' })
      },
      reject: () => {
        this.koef_cate_confirm.close();
      }
    })


  }
}
