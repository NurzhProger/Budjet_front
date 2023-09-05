import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { stazh_category_element } from '../interfaces';
import { StazhCategoryService } from '../stazh-category.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StazhCategoryListComponent } from '../stazh-category-list/stazh-category-list.component';

@Component({
  selector: 'app-stazh-category-element',
  templateUrl: './stazh-category-element.component.html',
  styleUrls: ['./stazh-category-element.component.css']
})
export class StazhCategoryElementComponent implements OnInit {

  constructor(
    private stazhCategoryService: StazhCategoryService,
    private stazh_category_massage: MessageService,
    private stazh_category_dialog_ref: DynamicDialogRef,
    private stazh_category_dialog_config: DynamicDialogConfig,
  ) { }

  stazh_category_element: stazh_category_element = {
    id: 0,
    name: '',
    ot: 0,
    do: 0 
  }

  form: FormGroup
  saved = false;
  checkDo = false;
  min = 1;
  minOt = 0;
  max = 50;
  stazh_list: StazhCategoryListComponent;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      ot: new FormControl(null, [this.checkValidOt(this.minOt, this.max)]),
      do: new FormControl(null, [this.checkValidDo(this.min, this.max)])
    })
    this.stazh_category_element.id = this.stazh_category_dialog_config.data.stazh_id;
    
    
    if (this.stazh_category_element.id !== 0) {
      this.stazhCategoryService.fetchStazh(this.stazh_category_element.id)
        .subscribe(
          (data) => (
              this.stazh_category_element = data
            )
        )
    }
  }

  saveStazh() {
    if (this.stazh_category_element.id == 0){      
      this.stazhCategoryService.add(this.stazh_category_element)
        .subscribe(
          (data) => (
            this.stazh_category_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Стаж категории сохранен!' })
          ),
          (error) => (this.stazh_category_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
     else {
          this.stazhCategoryService.edit(this.stazh_category_element)
          .subscribe((data) => (
            this.stazh_category_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Стаж категории сохранен!' })
          ),
          (error) => (this.stazh_category_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeStazh(true);
    this.stazh_list.fetchList();
  }

  checkinput(){
    if (this.stazh_category_element.ot > this.stazh_category_element.do){
      
      
      document.getElementById("save")?.ariaDisabled;
      this.checkDo = true;
    }
    else {
      this.checkDo = false;
      this.stazh_category_element.name = 'от '+this.stazh_category_element.ot+' до '+this.stazh_category_element.do+''; 
    }
    
  }

  closeStazh(save: boolean) {
    this.stazh_category_dialog_ref.close(save)
  }

  checkValidDo(min: number, max: number): ValidatorFn {
    
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'ageRange': true };
        }
        return null;
    };
}

checkValidOt(minOt: number, max: number): ValidatorFn {
    
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < minOt || control.value > max)) {
          return { 'ageRange': true };
      }
      return null;
  };
}



}
