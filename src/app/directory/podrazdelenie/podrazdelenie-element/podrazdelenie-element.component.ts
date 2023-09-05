import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { podrazdelenie_element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PodrazdelenieService } from '../podrazdelenie.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-podrazdelenie-element',
  templateUrl: './podrazdelenie-element.component.html',
  styleUrls: ['./podrazdelenie-element.component.css']
})
export class PodrazdelenieElementComponent implements OnInit {

  constructor(
    private podrazdelenie_dialog_ref: DynamicDialogRef,
    private podrazdelenieService: PodrazdelenieService,
    private podrazdelenie_massage: MessageService,
    private podrazdelenie_dialog_config: DynamicDialogConfig
  ) { }

  form: FormGroup

  podrazdelenie_element: podrazdelenie_element = {
    id: 0,
    name: '',
    name_kaz: '',
    name_rus: '',
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(),
      name_rus: new FormControl(),
    })
    this.podrazdelenie_element.id = this.podrazdelenie_dialog_config.data.podrazdelenie_id;
    if (this.podrazdelenie_element.id !== 0) {
      this.podrazdelenieService.fetchStazh(this.podrazdelenie_element.id)
        .subscribe(
          (data) => (
              this.podrazdelenie_element = data
            )
        )
    }
  }

  savePodr() {
    if (this.podrazdelenie_element.id == 0){      
      this.podrazdelenieService.add(this.podrazdelenie_element)
        .subscribe(
          (data) => (
            this.podrazdelenie_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Подразделение сохранено!' })
          ),
          (error) => (this.podrazdelenie_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    else {
          this.podrazdelenieService.edit(this.podrazdelenie_element)
          .subscribe((data) => (
            this.podrazdelenie_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Подразделение сохранено!' })
          ),
          (error) => (this.podrazdelenie_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closePodr(true);
  }

  closePodr(save: boolean) {
    this.podrazdelenie_dialog_ref.close(save);
  }

}
