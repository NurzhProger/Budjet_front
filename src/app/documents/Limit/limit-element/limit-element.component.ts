import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-limit-element',
  templateUrl: './limit-element.component.html',
  styleUrls: ['./limit-element.component.css']
})
export class LimitElementComponent implements OnInit {
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
  ngOnInit(): void {
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

  //   let objString = JSON.stringify(this.utvDetail)
  //   this.hashEnd = SHA256(objString).toString()

  //   if (close) {
  //     if (this.hashBegin == this.hashEnd) {
  //       this.closeEvent.emit()
  //     }
  //     else {
  //       this.utvDetailconfirm.confirm({
  //         message: 'Данные были изменены. Закрыть документ?',
  //         header: 'Закрытие',
  //         icon: 'pi pi-exclamation-triangle',
  //         accept: () => {
  //           this.closeEvent.emit()
  //           this.utvDetailconfirm.close()
  //         },
  //         reject: () => {
  //           this.utvDetailconfirm.close()
  //         }
  //       })
  //     }
  //   }
  }

}
