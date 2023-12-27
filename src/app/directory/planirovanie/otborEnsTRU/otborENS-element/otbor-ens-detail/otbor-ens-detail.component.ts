import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OtborENSListComponent } from '../../otborENS_list/otbor-ens-list/otbor-ens-list.component';
import { otbor_ensTRU_element } from '../../interfaces';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OtborEnsTRUService } from '../../otbor_enstru.service';
import { FormDetailComponent } from 'src/app/directory/income/forms/form-detail/form-detail.component';
import { EnstruSelectComponent } from '../../../ensTRU/enstru-select/enstru-select.component';
import { ensTRU_element } from '../../../ensTRU/interfaces';
import { FormSelectComponent } from 'src/app/directory/income/forms/form-select/form-select.component';
import { form_list_doc } from 'src/app/directory/income/forms/forms_interfaces';
import { SpecificationExpSelectComponent } from 'src/app/directory/expenses/specification-exp/specification-exp-select/specification-exp-select.component';
import { specification_expenses_detail } from 'src/app/directory/expenses/specification-exp/interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-otbor-ens-detail',
  templateUrl: './otbor-ens-detail.component.html',
  styleUrls: ['./otbor-ens-detail.component.css']
})
export class OtborENSDetailComponent implements OnInit {

  constructor(
    private dolzhnost_dialog_config: DynamicDialogConfig,
    private OtborEnsTRUService: OtborEnsTRUService,
    private podr_select_dialog_ref: DynamicDialogRef,
    private dolzhnostDialogService: DialogService,
    private dolzhnost_dialog_ref: DynamicDialogRef,
    private dolzhnost_message: MessageService,
  ) { }

  otborENS_element: otbor_ensTRU_element = {
    id: 0,
    _enstru: {
      id: 0,
      code: '',
      name_kaz: '',
      name_rus: '',
      harak_kaz: '',
      harak_rus: '',
      _tip_tru: ''
    },
    _form: {
      id: 0,
      _spec: {
        id: 0,
        code: '',
        name_rus: '',
        name_kaz: ''
      },
      name: '',
      head_form: '',
      head_form_kaz: '',
      num_app: 0
    },
    _spec: {
      id: 0,
      code: '',
      name_rus: '',
      name_kaz: ''
    }
  }
  form: FormGroup
  otborENS_list: OtborENSListComponent

  ngOnInit(): void {
    this.form = new FormGroup({
      ENSTRU_name: new FormControl(null, [Validators.required]),
      Forma_name: new FormControl(null, [Validators.required]),
      spec_name: new FormControl(null, [Validators.required]),
    })

    this.otborENS_element.id = this.dolzhnost_dialog_config.data.ens_id;

    if (this.otborENS_element.id !== 0) {
      this.OtborEnsTRUService.fetchEnsTRU(this.otborENS_element.id)
        .subscribe(
          (data) => (
            this.otborENS_element = data
          )
        )
    }
  }

  selectENS() {
    this.podr_select_dialog_ref = this.dolzhnostDialogService.open(EnstruSelectComponent,
      {
        header: 'Выбор ЕНС ТРУ',
        width: 'calc(60%)',
        height: 'calc(80%)',
      })
    this.podr_select_dialog_ref.onClose.subscribe((podrazdelenie: ensTRU_element) => {

      if (podrazdelenie) {
        this.otborENS_element._enstru = podrazdelenie
      }
    })
  }

  selectForma() {
    this.podr_select_dialog_ref = this.dolzhnostDialogService.open(FormSelectComponent,
      {
        header: 'Выбор формы',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: { _spec: this.otborENS_element._spec.id }
      })
    this.podr_select_dialog_ref.onClose.subscribe((podrazdelenie: form_list_doc) => {
      if (podrazdelenie) {
        this.otborENS_element._form = podrazdelenie
      }
    })
  }

  selectSpec() {
    this.podr_select_dialog_ref = this.dolzhnostDialogService.open(SpecificationExpSelectComponent,
      {
        header: 'Выбор специфики',
        width: 'calc(60%)',
        height: 'calc(80%)',
      })
    this.podr_select_dialog_ref.onClose.subscribe((podrazdelenie: specification_expenses_detail) => {

      if (podrazdelenie) {
        this.otborENS_element._spec = podrazdelenie
      }
    })
  }

  closeENS(save: boolean) {
    this.dolzhnost_dialog_ref.close(save);
  }

  saveENS() {
    if (this.otborENS_element.id == 0) {
      this.OtborEnsTRUService.edit(this.otborENS_element)
        .subscribe(
          (data) => (
            this.dolzhnost_message.add({ severity: 'success', summary: 'Успешно', detail: 'Cохранен!' })
          ),
          (error) => (this.dolzhnost_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
    else {
      this.OtborEnsTRUService.edit(this.otborENS_element)
        .subscribe((data) => (
          this.dolzhnost_message.add({ severity: 'success', summary: 'Успешно', detail: 'Cохранен!' })
        ),
          (error) => (this.dolzhnost_message.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }
    this.closeENS(true);
    // this.otborENS_list.fetchList();
  }

  clearENS() {
    // this.dolzhnost_element._podrazdelenie = 0;
    // this.dolzhnost_element.podrazdelenie_name = '';
  }

}
