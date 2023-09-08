import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { budjet_reg__element, budjet_reg_list } from './interfaces';
import { BudjetRegService } from './oblasti-regiony.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BudjetRegElementComponent } from '../budjet-reg-element/budjet-reg-element/budjet-reg-element.component';

@Component({
  selector: 'app-budjet-reg-list',
  templateUrl: './budjet-reg-list.component.html',
  styleUrls: ['./budjet-reg-list.component.css']
})
export class BudjetRegListComponent implements OnInit {
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()
  budjet_reg: Observable<budjet_reg_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private BudjetRegService: BudjetRegService,
    private budjet_dialog_ref: DynamicDialogRef,
    private budjet_dialog_servis: DialogService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {

  }

  onRowClick(budjet_reg: budjet_reg__element) {
    if (this.data) {
      this.onRowEdit(budjet_reg)
    }
    else {
      this.budjet_dialog_ref.close(budjet_reg)
    }     
  }

  onRowEdit(budjet_reg: budjet_reg__element) {
    this.budjet_dialog_ref = this.budjet_dialog_servis.open(BudjetRegElementComponent,
      {
        header: 'Редактирование подразделении',
        width: '60%',
        height: '60%',
        data: { budjet_reg_id: budjet_reg.id }
      })

    this.budjet_dialog_ref.onClose.subscribe((save: boolean) => {

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
    this.budjet_reg = this.BudjetRegService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }
}
