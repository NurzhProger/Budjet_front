import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ed-izm-list',
  templateUrl: './ed-izm-list.component.html',
  styleUrls: ['./ed-izm-list.component.css']
})
export class EdIzmListComponent implements OnInit {
  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
