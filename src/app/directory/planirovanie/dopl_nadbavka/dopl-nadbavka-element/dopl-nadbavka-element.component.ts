import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { doplaty_nadbavky_element, doplaty_nadbavky_list } from '../interfaces';
import { DoplataService } from './../../../../enums/tip_dopl/tip-dopl/doplata.service';
import { MessageService } from 'primeng/api';
import { DoplatyNadbavkyService } from '../doplaty-nadbavky.service';
import { DoplNadbavkaListComponent } from '../dopl-nadbavka-list/dopl-nadbavka-list.component';

@Component({
  selector: 'app-dopl-nadbavka-element',
  templateUrl: './dopl-nadbavka-element.component.html',
  styleUrls: ['./dopl-nadbavka-element.component.css']
})
export class DoplNadbavkaElementComponent implements OnInit {

  form: FormGroup
  constructor(
    private dopl_dialog_ref: DynamicDialogRef,
    private DoplataService: DoplataService,
    private messageServiceadd: MessageService,
    private doplatyNadbavkyService: DoplatyNadbavkyService,
    private doplnadb_massage: MessageService,
    private dopl_dialog_config: DynamicDialogConfig
  ) { }

  dopl_nadbavka_list: DoplNadbavkaListComponent
  doplaty_nadbavky_element: doplaty_nadbavky_element = {
    id: 0,
    name: '',
    name_kaz: '',
    name_rus: '',
    for_nalog: false,
    for_rb: false,
    _tip_dopl: ''
  }

  tip_options: any =[];

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(),
      name_rus: new FormControl(), 
      for_nalog: new FormControl(),
      _tip_dopl: new FormControl(null, [Validators.required]),
      for_rb: new FormControl()
    })
    this.doplaty_nadbavky_element.id = this.dopl_dialog_config.data.doplata_id;
    
    if (this.doplaty_nadbavky_element.id !== 0) {
      this.doplatyNadbavkyService.fetchDoplata(this.doplaty_nadbavky_element.id)
        .subscribe(
          (data) => (
              this.doplaty_nadbavky_element = data,
              this.tip_options.value = this.doplaty_nadbavky_element._tip_dopl,
              this.tip_options.label = this.doplaty_nadbavky_element._tip_dopl,
              console.log(this.tip_options)
            )
        )
          
    }
  }

  saveDopl() {
    
    if (this.doplaty_nadbavky_element.id == 0){      
    this.doplatyNadbavkyService.add(this.doplaty_nadbavky_element)
      .subscribe(
        (data) => (
          this.doplnadb_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Категория сотрудника сохранена!' })
        ),
        (error) => (this.doplnadb_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
      }
   else {
        this.doplatyNadbavkyService.edit(this.doplaty_nadbavky_element)
        .subscribe((data) => (
          this.doplnadb_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Категория сотрудника сохранена!' })
        ),
        (error) => (this.doplnadb_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
      }
  this.closeDopl(true);
  this.dopl_nadbavka_list.fetchList()

  }

  closeDopl(save: boolean) {
    this.dopl_dialog_ref.close(save);
  }

  selectTip() {
    let responce: any;
    this.DoplataService.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results
      ),
        (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));  
        
  }

}
