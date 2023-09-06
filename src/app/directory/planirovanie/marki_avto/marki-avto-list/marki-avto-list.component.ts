import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marki-avto-list',
  templateUrl: './marki-avto-list.component.html',
  styleUrls: ['./marki-avto-list.component.css']
})
export class MarkiAvtoListComponent implements OnInit {

  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
