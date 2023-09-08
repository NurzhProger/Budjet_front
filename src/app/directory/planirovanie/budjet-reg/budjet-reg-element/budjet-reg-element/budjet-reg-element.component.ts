import { Component, OnInit } from '@angular/core';
import { budjet_reg__element } from '../../budjet-reg-list/interfaces';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BudjetRegService } from '../../budjet-reg-list/oblasti-regiony.service';

@Component({
  selector: 'app-budjet-reg-element',
  templateUrl: './budjet-reg-element.component.html',
  styleUrls: ['./budjet-reg-element.component.css']
})
export class BudjetRegElementComponent implements OnInit {

  budjet_reg_element: budjet_reg__element = {
    id: 0,
    code: '',
    name_kaz: '',
    name_rus: '',
  }
  constructor(
    private budjet_reg_dialog_config: DynamicDialogConfig,
    private BudjetRegService: BudjetRegService
  ) { }

  ngOnInit(): void {
    this.budjet_reg_element.id = this.budjet_reg_dialog_config.data.budjetreg_id;
    
    if (this.budjet_reg_element.id !== 0) {
      this.BudjetRegService.fetchBudjetReg(this.budjet_reg_element.id)
        .subscribe(
          (data) => (
              this.budjet_reg_element = data
            )
        )
    }
  }

}
