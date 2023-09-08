import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { regions__element, regions_list } from '../interfaces';
import RegionsService from '../regions.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegionsElementComponent } from '../regions-element/regions-element.component';

@Component({
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html',
  styleUrls: ['./regions-list.component.css']
})
export class RegionsListComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  regions: Observable<regions_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private RegionsService: RegionsService,
    private regions_dialog_ref: DynamicDialogRef,
    private regions_dialog_servis: DialogService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.regions_dialog_ref = this.regions_dialog_servis.open(RegionsElementComponent,
      {
        header: 'Создание регионы',
        width: '60%',
        height: '60%',
        data: { regions_id: 0 }
      })

      this.regions_dialog_ref.onClose.subscribe((save: boolean) => {
      
        if (save) {
          this.fetchList()
        }
      })
  }

  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.regions = this.RegionsService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowClick(regions: regions__element) {
    if (this.data) {
      this.onRowEdit(regions)
    }
    else {
      this.regions_dialog_ref.close(regions) 
    }
  }

  onRowEdit(regions: regions__element) {
    this.regions_dialog_ref = this.regions_dialog_servis.open(RegionsElementComponent,
      {
        header: 'Редактирование региона',
        width: '60%',
        height: '60%',
        data: { regions_id: regions.id }
      })
  }

}
