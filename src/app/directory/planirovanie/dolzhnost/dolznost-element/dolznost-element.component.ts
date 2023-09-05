import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dolzhnost_element, dolzhnost_list } from '../interfaces';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { podrazdelenie_element } from 'src/app/directory/podrazdelenie/interfaces';
import { PodrazdelenieListComponent } from 'src/app/directory/podrazdelenie/podrazdelenie-list/podrazdelenie-list.component';
import { MessageService } from 'primeng/api';
import { DolzhnostService } from '../dolzhnost.service';
import { DolznostListComponent } from '../dolznost-list/dolznost-list.component';

@Component({
  selector: 'app-dolznost-element',
  templateUrl: './dolznost-element.component.html',
  styleUrls: ['./dolznost-element.component.css']
})
export class DolznostElementComponent implements OnInit {

  constructor(
    private dolzhnost_dialog_ref: DynamicDialogRef,
    private dolzhnostDialogService: DialogService,
    private podr_select_dialog_ref: DynamicDialogRef,
    private DolzhnostService: DolzhnostService,
    private dolzhnost_message:MessageService,
    private dolzhnost_dialog_config: DynamicDialogConfig
  ) { }

  form: FormGroup
  dolzhnost_list: DolznostListComponent

  dolzhnost_element: dolzhnost_element = {
    id: 0,
    name: '',
    name_kaz: '',
    name_rus: '',
    _podrazdelenie: 0,
    podrazdelenie_name: ''
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(),
      name_rus: new FormControl(),
      podrazdelenie_name: new FormControl(null, [Validators.required]),
    })
    
    this.dolzhnost_element.id = this.dolzhnost_dialog_config.data.dolzhnost_id;
    if (this.dolzhnost_element.id !== 0) {
      this.DolzhnostService.fetchDolzhnost(this.dolzhnost_element.id)
        .subscribe(
          (data) => (
              this.dolzhnost_element = data
            )
        )
    }
  }

  saveDolzhnost() {
    if (this.dolzhnost_element.id == 0){      
      this.DolzhnostService.add(this.dolzhnost_element)
        .subscribe(
          (data) => (
            this.dolzhnost_message.add({ severity: 'success', summary: 'Успешно', detail: 'Должность сохранен!' })
          ),
          (error) => (this.dolzhnost_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    else {
          this.DolzhnostService.edit(this.dolzhnost_element)
          .subscribe((data) => (
            this.dolzhnost_message.add({ severity: 'success', summary: 'Успешно', detail: 'Должность сохранен!' })
          ),
          (error) => (this.dolzhnost_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeDolzhnost(true);
    this.dolzhnost_list.fetchList();
  }

  closeDolzhnost(save: boolean) {
    this.dolzhnost_dialog_ref.close(save);
  }

  selectPodr() {
    this.podr_select_dialog_ref = this.dolzhnostDialogService.open(PodrazdelenieListComponent,
      {
          header: 'Выбор подразделения',
          width: 'calc(60%)',
          height: 'calc(80%)',
      })
    this.podr_select_dialog_ref.onClose.subscribe((podrazdelenie: podrazdelenie_element) => {
      if (podrazdelenie) {
        this.dolzhnost_element._podrazdelenie = podrazdelenie.id;
        this.dolzhnost_element.podrazdelenie_name = podrazdelenie.name;
      }
      })
  }

  clearPodr() {
    this.dolzhnost_element._podrazdelenie = 0;
    this.dolzhnost_element.podrazdelenie_name = '';
  }

}
