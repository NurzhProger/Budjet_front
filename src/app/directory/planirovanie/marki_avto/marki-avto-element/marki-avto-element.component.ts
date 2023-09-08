import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marki_avto_element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipToplivaService } from 'src/app/enums/tip_topliva/tip-topliva/tiptopliva.service'
import { MessageService } from 'primeng/api';
import { VidTransportaService } from 'src/app/enums/vid_transporta/vid-transporta/vidtransporta.service'
import { MarkiAvtoService } from 'src/app/directory/planirovanie/marki_avto/marki-avto.service'
import { MarkiAvtoListComponent } from '../marki-avto-list/marki-avto-list.component';

@Component({
  selector: 'app-marki-avto-element',
  templateUrl: './marki-avto-element.component.html',
  styleUrls: ['./marki-avto-element.component.css']
})
export class MarkiAvtoElementComponent implements OnInit {
  form: FormGroup
  tip_topliva: any =[];
  vid_transporta: any =[];
  marki_avto_element: marki_avto_element = {
    id: 0,
    name: '',
    engine_capacity: 0,
    deleted: false,
    _tip_topliva: '',
    _vid_transporta: ''
  }
  marki_avto_list: MarkiAvtoListComponent;
  constructor(
    private marki_avto_dialog_ref: DynamicDialogRef,
    private TipToplivaService: TipToplivaService,
    private messageServiceadd: MessageService,
    private VidTransportaService: VidTransportaService,
    private MarkiAvtoService: MarkiAvtoService,
    private markiavto_massage: MessageService,
    private marki_avto_dialog_config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      engine_capacity: new FormControl(),
      _tip_topliva: new FormControl(),
      _vid_transporta: new FormControl()
    })
    this.marki_avto_element.id = this.marki_avto_dialog_config.data.markiavto_id;
    if (this.marki_avto_element.id !== 0) {
      this.MarkiAvtoService.fetchMarkiAvto(this.marki_avto_element.id)
        .subscribe(
          (data) => (
              this.marki_avto_element = data
            )
        )
            
    }
    this.selectTip_topliva();
    this.selectVid_transporta();
  }
  

  saveAvto() {
    if (this.marki_avto_element.id == 0){      
      this.MarkiAvtoService.add(this.marki_avto_element)
        .subscribe(
          (data) => (
            this.markiavto_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Автомобиль сохранен!' })
          ),
          (error) => (this.markiavto_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
     else {
          this.MarkiAvtoService.edit(this.marki_avto_element)
          .subscribe((data) => (
            this.markiavto_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Автомобиль сохранен!' })
          ),
          (error) => (this.markiavto_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closeAvto(true);
    this.marki_avto_list.fetchList()
  }

  closeAvto(save: boolean) {
    this.marki_avto_dialog_ref.close(save);
  }

  selectTip_topliva() {
    let responce: any;
    this.TipToplivaService.fetch().subscribe(
      (data) => (responce = data, this.tip_topliva = responce.results
      ),
        (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }
  

  selectVid_transporta() {
    let responce: any;
    this.VidTransportaService.fetch().subscribe(
      (data) => (responce = data, this.vid_transporta = responce.results
      ),
        (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

}
