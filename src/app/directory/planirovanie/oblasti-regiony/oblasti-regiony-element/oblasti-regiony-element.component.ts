import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { oblasti_element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OblastiService } from 'src/app/directory/planirovanie/oblasti-regiony/oblasti-regiony.service'
import { MessageService } from 'primeng/api';
import { OblastiRegionyListComponent } from '../oblasti-regiony-list/oblasti-regiony-list.component';

@Component({
  selector: 'app-oblasti-regiony-element',
  templateUrl: './oblasti-regiony-element.component.html',
  styleUrls: ['./oblasti-regiony-element.component.css']
})
export class OblastiRegionyElementComponent implements OnInit {
  form: FormGroup
  oblasti_element: oblasti_element = {
    id: 0,
    name: '',
    deleted: false
  }
  oblasti_list: OblastiRegionyListComponent
  constructor(
    private oblasti_dialog_ref: DynamicDialogRef,
    private OblastiService: OblastiService,
    private oblasti_massage: MessageService,
    private oblasti_dialog_config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    })
    this.oblasti_element.id = this.oblasti_dialog_config.data.oblasti_id;
    if (this.oblasti_element.id !== 0) {
      this.OblastiService.fetchOblast(this.oblasti_element.id)
        .subscribe(
          (data) => (
              this.oblasti_element = data
            )
        )
            
    }
  }

  closeOblast(save: boolean) {
    this.oblasti_dialog_ref.close(save);
  }

  saveOblast() {
    if (this.oblasti_element.id == 0){      
      this.OblastiService.add(this.oblasti_element)
        .subscribe(
          (data) => (
            this.oblasti_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Область сохранен!' })
          ),
          (error) => (this.oblasti_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
     else {
          this.OblastiService.edit(this.oblasti_element)
          .subscribe((data) => (
            this.oblasti_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Область сохранен!' })
          ),
          (error) => (this.oblasti_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeOblast(true);
    this.oblasti_list.fetchList()
  }

}
