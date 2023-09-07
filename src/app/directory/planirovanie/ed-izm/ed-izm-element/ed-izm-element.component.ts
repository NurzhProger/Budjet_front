import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ed_izm_element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EdIzmService } from '../ed-izm.service';
import { MessageService } from 'primeng/api';
import { EdIzmListComponent } from '../ed-izm-list/ed-izm-list.component';

@Component({
  selector: 'app-ed-izm-element',
  templateUrl: './ed-izm-element.component.html',
  styleUrls: ['./ed-izm-element.component.css']
})
export class EdIzmElementComponent implements OnInit {
  form: FormGroup
  ed_izm_element: ed_izm_element = {
    id: 0,
    name: '',
    code: 0,
    usl_oboz: ''
  }
  ed_izm_list: EdIzmListComponent
  constructor(
    private ed_izm_dialog_ref: DynamicDialogRef,
    private EdIzmService: EdIzmService,
    private ed_izm_massage: MessageService,
    private ed_izm_dialog_config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      usl_oboz: new FormControl(null, [Validators.required]),
    })
    this.ed_izm_element.id = this.ed_izm_dialog_config.data.edizm_id;
    
    if (this.ed_izm_element.id !== 0) {
      this.EdIzmService.fetchEdIzm(this.ed_izm_element.id)
        .subscribe(
          (data) => (
              this.ed_izm_element = data
            )
        )
            
    }
  }

  closeEdIzm(save: boolean) {
    this.ed_izm_dialog_ref.close(save);
  }

  saveEdIzm() {
    if (this.ed_izm_element.id == 0){      
      this.EdIzmService.add(this.ed_izm_element)
        .subscribe(
          (data) => (
            this.ed_izm_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Единица измерения сохранена!' })
          ),
          (error) => (this.ed_izm_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
     else {
          this.EdIzmService.edit(this.ed_izm_element)
          .subscribe((data) => (
            this.ed_izm_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Единица измерения сохранена!' })
          ),
          (error) => (this.ed_izm_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeEdIzm(true);
    this.ed_izm_list.fetchList() 
  }

}
