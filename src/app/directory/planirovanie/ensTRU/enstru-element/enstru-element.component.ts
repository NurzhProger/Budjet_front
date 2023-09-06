import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnstruListComponent } from '../enstru-list/enstru-list.component';
import { ensTRU_element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipTruService } from 'src/app/enums/tip_tru/tip-tru/tiptru.service'
import { MessageService } from 'primeng/api';
import { EnsTRUService } from 'src/app/directory/planirovanie/ensTRU/enstru.service'

@Component({
  selector: 'app-enstru-element',
  templateUrl: './enstru-element.component.html',
  styleUrls: ['./enstru-element.component.css']
})
export class EnstruElementComponent implements OnInit {

  form: FormGroup
  constructor(
    private ensTRU_dialog_ref: DynamicDialogRef,
    private TipTruService: TipTruService,
    private messageServiceadd: MessageService,
    private EnsTRUService: EnsTRUService,
    private ensTRU_massage: MessageService,
    private ensTRU_dialog_config: DynamicDialogConfig
  ) { }
  ensTRU_list: EnstruListComponent
  ensTRU_element: ensTRU_element = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: '',
    harak_kaz: '',
    harak_rus: '',
    _tip_tru: ''
  }
  tip_options: any =[];

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required]),
      harak_kaz: new FormControl(),
      harak_rus: new FormControl(),
      _tip_tru: new FormControl(),
    })
    this.ensTRU_element.id = this.ensTRU_dialog_config.data.ensTRU_id;
    
    if (this.ensTRU_element.id !== 0) {
      this.EnsTRUService.fetchEnsTRU(this.ensTRU_element.id)
        .subscribe(
          (data) => (
              this.ensTRU_element = data
            )
        )
            
    }
    this.selectTip()
  }

  saveEns() {
    if (this.ensTRU_element.id == 0){      
      this.EnsTRUService.add(this.ensTRU_element)
        .subscribe(
          (data) => (
            this.ensTRU_massage.add({ severity: 'success', summary: 'Успешно', detail: 'ЕНС ТРУ сохранен!' })
          ),
          (error) => (this.ensTRU_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
     else {
          this.EnsTRUService.edit(this.ensTRU_element)
          .subscribe((data) => (
            this.ensTRU_massage.add({ severity: 'success', summary: 'Успешно', detail: 'ЕНС ТРУ сохранен!' })
          ),
          (error) => (this.ensTRU_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeEns(true);
    this.ensTRU_list.fetchList()
  }

  closeEns(save: boolean) {
    this.ensTRU_dialog_ref.close(save);
  }

  selectTip() {
    let responce: any;
    this.TipTruService.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results
      ),
        (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

}
