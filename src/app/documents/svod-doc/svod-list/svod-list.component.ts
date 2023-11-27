import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-svod-list',
  templateUrl: './svod-list.component.html',
  styleUrls: ['./svod-list.component.css']
})
export class SvodListComponent implements OnInit {

 
  constructor() { }
  @Output() closeEvent = new EventEmitter<any>()
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() data = false

  ngOnInit(): void {
  }
  openNew() {
    this.newItemEvent.emit({ params: { selector: 'app-svod-detail', nomer: 'Свод бюджетной заявки', id: '' } });
  }
  fetch(){
  }
  closeform(){
    this.closeEvent.emit()
  }
}
