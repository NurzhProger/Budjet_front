import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prilozhenie5758',
  templateUrl: './prilozhenie5758.component.html',
  styleUrls: ['./prilozhenie5758.component.css']
})
export class Prilozhenie5758Component implements OnInit {

  constructor() { }
  prilozhenieType: any = []
  url: any = ''
  prilozhenieValue = 'prilozhenie57'
  _organization = {
    'id': 0,
    'name': ''
}

_fkr = {
  'id': 0,
  'name': ''
}
  ngOnInit(): void {
    this.prilozhenieType = [
      { label: 'Приложение 57', value: 'prilozhenie57' },
      { label: 'Приложение 58', value: 'prilozhenie58' }
  ]
  }

  form() {

  }

  viewOrg() {

  }

  selectOrg() {

  }

  selectFKR() {

  }

  changePrilozhenie() {
    this.url = ''
  }

  closeform() {

  }


}
