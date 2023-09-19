import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { limit_doc, limit_list } from '../interfaces';
import { LimitService } from '../limit.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LimitElementComponent } from '../limit-element/limit-element.component';

@Component({
  selector: 'app-limit-list',
  templateUrl: './limit-list.component.html',
  styleUrls: ['./limit-list.component.css']
})
export class LimitListComponent implements OnInit {
  @Input() data = false
  @Output() newItemEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<any>()
  limit: Observable<limit_list>
  windowHeight: number
  selected: any
  first = 0
  rows = 25
  constructor(
    private LimitService: LimitService,
    private limit_dialog_ref: DynamicDialogRef,
    private limit_dialog_servis: DialogService
  ) { }

  ngOnInit(): void {
    this.fetchList(),
    this.updateWindowSize() 
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-limit-element', nomer: 'Лимит на годовой бюджет ', id: '' } });
  }
  
  fetchList() {
    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString()
    }
    this.limit = this.LimitService.fetch(params);
  }

  closeform() {
    this.closeEvent.emit();
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetchList()
  }

  onRowEdit(limit: limit_doc) {
    this.newItemEvent.emit({ params: { selector: 'app-limit-element', nomer: 'Лимит на годовой бюджет ' + limit.nom, id: limit.id } });
  }

  onRowClick(limit: limit_doc) {
    if (this.data) {
      this.onRowEdit(limit)
    }
    else {
      this.limit_dialog_ref.close(limit)
    }
  }

}
