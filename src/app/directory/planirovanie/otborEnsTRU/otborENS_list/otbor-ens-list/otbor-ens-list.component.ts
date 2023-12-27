import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-otbor-ens-list',
  templateUrl: './otbor-ens-list.component.html',
  styleUrls: ['./otbor-ens-list.component.css']
})
export class OtborENSListComponent implements OnInit {

  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

}
