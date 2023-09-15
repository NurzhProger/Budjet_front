import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { limit_detail, limit_doc } from '../interfaces';
import { budjet_reg__element } from 'src/app/directory/planirovanie/budjet-reg/budjet-reg-list/interfaces';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-limit-element',
  templateUrl: './limit-element.component.html',
  styleUrls: ['./limit-element.component.css']
})
export class LimitElementComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>();
  @Input() limit_id = ''
  constructor() {
    this.items = [
      {
        label: 'Записать',
        icon: 'pi pi-save',
        command: () => {
          this.saveDoc(false);
        }
      }
    ]
  }
  items: MenuItem[];
  form: FormGroup

  // limitDetail: limit_detail = {
  //   // head: {
  //   //   id: 0,
  //   //   nom: '',
  //   //   org_name: '',
  //   //   _date: '',
  //   //   god_ucheta: '',
  //   //   _organization: {
  //   //     id: 0,
  //   //     bin: '',
  //   //     name_kaz: '',
  //   //     name_rus: '',
  //   //     adress: '',
  //   //     deleted: false,
  //   //     budjet_name: '',
  //   //     _budjet_reg: number,
  //   //     region_name: string,
  //   //     _regiondar: number
  //   //   }
  //   // }
  // }

  hashEnd = ''
  hashBegin = ''
  ngOnInit(): void {
    this.form = new FormGroup({
      
    })
  }

  saveDoc(close: boolean): void {
    let responce: any

    // this.utvDetailService.saveUtv(this.utvDetail)
    //   .subscribe(
    //     (data) => (
    //       this.utvDetailmsg.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
    //       responce = data, this.utvDetail = responce, this.closeaftersave(close)
    //     ),
    //     (error) => (
    //       this.utvDetailmsg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
    //     )
    //   )
  }

  closeform(close: boolean) {

    // let objString = JSON.stringify(this.limitDetail)
    // this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
      //   this.utvDetailconfirm.confirm({
      //     message: 'Данные были изменены. Закрыть документ?',
      //     header: 'Закрытие',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //       this.closeEvent.emit()
      //       this.utvDetailconfirm.close()
      //     },
      //     reject: () => {
      //       this.utvDetailconfirm.close()
      //     }
      //   })
      }
    }
  }

}
