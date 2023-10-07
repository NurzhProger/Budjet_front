import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { doplaty_nadbavky_element, doplaty_nadbavky_list } from '../interfaces';
import { DoplatyNadbavkyService } from '../doplaty-nadbavky.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoplNadbavkaElementComponent } from '../dopl-nadbavka-element/dopl-nadbavka-element.component';
import { DoplataService } from '../../../../enums/tip_dopl/tip-dopl/doplata.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dopl-nadbavka-select',
  templateUrl: './dopl-nadbavka-select.component.html',
  styleUrls: ['./dopl-nadbavka-select.component.css']
})
export class DoplNadbavkaSelectComponent implements OnInit {


  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  doplaty_nadbavky: Observable<doplaty_nadbavky_list>
  windowHeight: number
  selected: any
  search:string = ""
  first = 0
  tip_options: any =[];
  otbor_tip_doplata: string = ''
  rows = 25

  constructor(
    private DoplatyNadbavkyService: DoplatyNadbavkyService,
    private dopl_dialog_ref: DynamicDialogRef,
    private dopl_dialog_servis: DialogService,
    private tip_doplata_serv:DoplataService,
    private japan_massage_body: MessageService

  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize(),
    this.selectTipTop()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  onSelected(dopl_nadbavky:doplaty_nadbavky_element) {
    if (!this.selected) {
    this.japan_massage_body.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите надбавку!' })
    return
    }
    this.dopl_dialog_ref.close(dopl_nadbavky)
    }


  selectTipTop() {
    let responce: any;
    this.tip_doplata_serv.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results
      ),
        (error) => (this.japan_massage_body.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));

  }

  onValueChange(newValue: string){

    this.otbor_tip_doplata = newValue
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search,
      tip_dopl: this.otbor_tip_doplata
    }
    this.doplaty_nadbavky = this.DoplatyNadbavkyService.fetch(params);

  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.search,
    }
    this.doplaty_nadbavky = this.DoplatyNadbavkyService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.fetchList()
  }

  onRowClick(dopl_nadbavky: doplaty_nadbavky_element) {
    if (this.data) {
      this.onRowEdit(dopl_nadbavky)
    }
    else {
      this.dopl_dialog_ref.close(dopl_nadbavky)
    }
  }


  onRowEdit(dopl_nadbavky: doplaty_nadbavky_element) {
    this.dopl_dialog_ref = this.dopl_dialog_servis.open(DoplNadbavkaElementComponent,
      {
        header: 'Редактирование категории сотрудника',
        width: '60%',
        height: '60%',
        data: { doplata_id: dopl_nadbavky.id }
      })

    this.dopl_dialog_ref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetchList()
      }
    })
  }
}
