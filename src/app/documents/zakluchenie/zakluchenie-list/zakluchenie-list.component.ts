import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-zakluchenie-list',
  templateUrl: './zakluchenie-list.component.html',
  styleUrls: ['./zakluchenie-list.component.css']
})
export class ZakluchenieListComponent implements OnInit {

  @Input() data = false
  @Output() newItemEvent = new EventEmitter<any>()
  @Output() closeEvent = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {

  }

}
