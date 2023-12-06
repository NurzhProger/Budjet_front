import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { regions__element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import RegionsService from '../regions.service';
import { MessageService } from 'primeng/api';
import { RegionsListComponent } from '../regions-list/regions-list.component';

@Component({
  selector: 'app-regions-element',
  templateUrl: './regions-element.component.html',
  styleUrls: ['./regions-element.component.css']
})
export class RegionsElementComponent implements OnInit {
  form: FormGroup
  regions_element: regions__element = {
    id: 0,
    name: '',
    name_kaz: '',
    name_rus: ''
  }
  regions_list: RegionsListComponent
  constructor(
    private regions_dialog_ref: DynamicDialogRef,
    private RegionsService: RegionsService,
    private regions_massage: MessageService,
    private regions_dialog_config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      name_kaz: new FormControl(null, [Validators.required]),
      name_rus: new FormControl(null, [Validators.required])
    })
    this.regions_element.id = this.regions_dialog_config.data.regions_id;
    if (this.regions_element.id !== 0) {
      this.RegionsService.fetchRegion(this.regions_element.id)
        .subscribe(
          (data) => (
            this.regions_element = data
          )
        )

    }
  }

  closeRegions(save: boolean) {
    this.regions_dialog_ref.close(save);
  }

  saveRegions() {
    if (this.regions_element.id == 0) {
      this.RegionsService.add(this.regions_element)
        .subscribe(
          (data) => (
            this.regions_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Область сохранен!' })
          ),
          (error) => (this.regions_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
    else {
      this.RegionsService.edit(this.regions_element)
        .subscribe((data) => (
          this.regions_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Область сохранен!' })
        ),
          (error) => (this.regions_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
    this.closeRegions(true);
  }

}
