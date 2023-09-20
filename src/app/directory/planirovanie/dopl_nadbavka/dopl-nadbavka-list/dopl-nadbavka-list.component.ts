import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { doplaty_nadbavky_element, doplaty_nadbavky_list } from '../interfaces';
import { DoplatyNadbavkyService } from '../doplaty-nadbavky.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoplNadbavkaElementComponent } from '../dopl-nadbavka-element/dopl-nadbavka-element.component';


@Component({
  selector: 'app-dopl-nadbavka-list',
  templateUrl: './dopl-nadbavka-list.component.html',
  styleUrls: ['./dopl-nadbavka-list.component.css']
})
export class DoplNadbavkaListComponent implements OnInit {


  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  doplaty_nadbavky: Observable<doplaty_nadbavky_list>
  windowHeight: number
  selected: any
  search:string = ""
  first = 0
  rows = 25

  constructor(
    private DoplatyNadbavkyService: DoplatyNadbavkyService,
    private dopl_dialog_ref: DynamicDialogRef,
    private dopl_dialog_servis: DialogService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.dopl_dialog_ref = this.dopl_dialog_servis.open(DoplNadbavkaElementComponent,
      {
        header: 'Создание доплат и надбавок',
        width: '60%',
        height: '60%',
        data: { doplata_id: 0 }
      })

      this.dopl_dialog_ref.onClose.subscribe((save: boolean) => {

        if (save) {
          this.fetchList()
        }
      })
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
