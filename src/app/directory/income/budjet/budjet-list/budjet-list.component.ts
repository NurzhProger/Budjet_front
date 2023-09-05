import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Budjet_list , Budjet_detail} from '../interfaces';
import { Budjet_Service } from '../budjet.servise';
import { Observable } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-budjet-list',
  templateUrl: './budjet-list.component.html',
  styleUrls: ['./budjet-list.component.css']
})
export class BudjetListComponent implements OnInit {

  constructor(
    private budjet_Service: Budjet_Service,
    private dialog_ref: DynamicDialogRef
    ) { }

  @Output() closeEvent = new EventEmitter<any>()

  Budjet$: Observable<Budjet_list>
  first = 0
  rows = 25
  last = 3
  windowHeight: number
  // items = ["5","10","20","30","50"]
  // selectedItem = 'Количество строк'

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize()
  }

  ngOnInit(): void {
    this.fetchbudjet(),
    this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  closeform() {
    this.closeEvent.emit()
  }

  fetchbudjet() {

    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }

    this.Budjet$ = this.budjet_Service.fetch(params)

  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchbudjet()
  }

  selectBudjet(budjet: any) {
    // alert(id);
    this.dialog_ref.close(budjet);


  }

  // onRowEdit(){
  //   alert("Все нормально");
  // }

  // fetchCat(){

  // }

  // searchcategory(){

  // }

  // search(){

  // }

  // openNew(){
  //   this.org_dialog_ref = this.org_dialog_servis.open(OrganizationDetailComponent,
  //     {
  //       header: 'Создание организации',
  //       width: '50%',
  //       height: '50%',
  //       data: { organizations: this.Pusti_dannye }
  //     })
  // }

}
