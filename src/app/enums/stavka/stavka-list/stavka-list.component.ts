import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stavka-list',
  templateUrl: './stavka-list.component.html',
  styleUrls: ['./stavka-list.component.css']
})
export class StavkaListComponent implements OnInit {

  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
