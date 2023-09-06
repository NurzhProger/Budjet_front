import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-period-pokaz-list',
  templateUrl: './period-pokaz-list.component.html',
  styleUrls: ['./period-pokaz-list.component.css']
})
export class PeriodPokazListComponent implements OnInit {

  @Input() data = false
  constructor() { }

  ngOnInit(): void {
  }

}
