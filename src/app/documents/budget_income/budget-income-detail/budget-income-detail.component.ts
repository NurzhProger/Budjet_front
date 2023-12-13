import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { budget_income_detail, budget_income_list } from '../budget_income_interfaces';
import { BudgetIncomeService } from '../budget_income.servise';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SHA256 } from 'crypto-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationDetailComponent } from 'src/app/directory/organization/organization-detail/organization-detail.component';
import { OrganizationSelectComponent } from 'src/app/directory/organization/organization-select/organization-select.component';
import { organization_detail } from 'src/app/directory/organization/interfaces';
import { SpecificationIncomeSelectComponent } from 'src/app/directory/income/specification-income/specification-income-select/specification-income-select.component';
import { specification_income_detail } from 'src/app/directory/income/specification-income/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget-income-detail',
  templateUrl: './budget-income-detail.component.html',
  styleUrls: ['./budget-income-detail.component.css']
})
export class BudgetIncomeDetailComponent implements OnInit {
  @Input() budjet_income_id = ''
  @Input() data = false
  @Output() closeEvent = new EventEmitter<any>();
  @Output() newItemEvent = new EventEmitter<any>()
  constructor(
    private budgetincService: BudgetIncomeService,
    private budgetincMessage: MessageService,
    private budgetincConfirmation: ConfirmationService,
    private budgetinc_Rer: DynamicDialogRef,
    private budgetIncDialog: DialogService,
    private budget_income_service: BudgetIncomeService
  ) { }
  Budget_income_list$: Observable<budget_income_list>
  budget_income_detail: budget_income_detail
  tbl: any = []
  hashBegin = ''
  hashEnd = ''
  godNumber: number
  items: MenuItem[];
  form: FormGroup
  first = 0
  rows = 25
  
  
  ngOnInit(): void {
    this.form = new FormGroup({
      number_doc: new FormControl(null),
      date_doc: new FormControl(null, [Validators.required]),
      org_name: new FormControl(null, [Validators.required]),
      god_ucheta: new FormControl(null, [Validators.required]),
      summ: new FormControl(null)
    })
    
    if (this.budjet_income_id !== '') {
      this.fetch_detail()
    }
  }


  saveDoc(close: boolean) {

    this.tbl = this.budget_income_detail.tbl
    

    this.budgetincService
      .saveInc(this.budget_income_detail)
      .subscribe(
        (data) => (
          this.budgetincMessage.add({ severity: 'success', summary: 'Успешно', detail: 'Документ успешно записан!' }),
          this.closeaftersave(close)
        ),
        (error) => (
          this.budgetincMessage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
        )
      )
  }
  // fetch(){
  //   let params = {
  //     limit: this.rows.toString(),
  //     offset: this.first.toString()
  //   }
  //   this.Budget_income_list$ = this.budget_income_service.fetch(params)
    
  // }


  closeform(close: boolean) {
    let objString = JSON.stringify(this.budget_income_detail)
    this.hashEnd = SHA256(objString).toString()

    if (close) {
      if (this.hashBegin == this.hashEnd) {
        this.closeEvent.emit()
      }
      else {
        this.budgetincConfirmation.confirm({
          message: 'Данные были изменены. Закрыть документ?',
          header: 'Закрытие',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.closeEvent.emit()
            this.budgetincConfirmation.close()
          },
          reject: () => {
            this.budgetincConfirmation.close()
          }
        })
      }
    }
  }

  preobGodNumber() {
    this.godNumber = parseInt(this.budget_income_detail.head.god_ucheta.slice(0, 4))
    let objString = JSON.stringify(this.budget_income_detail)
    this.hashBegin = SHA256(objString).toString()
  }

  closeaftersave(close: boolean) {
    let objString = JSON.stringify(this.budget_income_detail)
    this.hashEnd = SHA256(objString).toString()

    this.hashBegin = this.hashEnd

    if (close) {
      this.closeEvent.emit()
    }
    else (
      this.fetch_detail()
    )
  }

  fetch_detail() {
    this.budgetincService.fetch_detail(this.budjet_income_id)
      .subscribe(
        (detail) => {
          this.budget_income_detail = detail,
            this.tbl = this.budget_income_detail.tbl,
            this.preobGodNumber()    
        }
      )
  }

  viewOrg() {
    this.budgetinc_Rer = this.budgetIncDialog.open(OrganizationDetailComponent,
      {
        header: 'Редактирование организации',
        width: '60%',
        height: '80%',
        data: { org_id: this.budget_income_detail.head._organization.id }
      })

    this.budgetinc_Rer.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.budget_income_detail.head._organization.id = org.id,
          this.budget_income_detail.head._organization.name_rus = org.name_rus
      }
    })
  }
  selectOrg() {
    this.budgetinc_Rer = this.budgetIncDialog.open(OrganizationSelectComponent,
      {
        header: 'Выбор организации',
        width: '60%',
        height: '80%'
      })

    this.budgetinc_Rer.onClose.subscribe((org: organization_detail) => {
      if (org) {
        this.budget_income_detail.head._organization.id = org.id,
          this.budget_income_detail.head._organization.name_rus = org.name_rus
      }
    })
  }

  changeGodUch() {
    this.budget_income_detail.head.god_ucheta = String(this.godNumber + '-01-01')
  }

  openNew() {
    this.budgetinc_Rer = this.budgetIncDialog.open(SpecificationIncomeSelectComponent,
      {
        header: 'Выбор специфика поступления',
        width: '60%',
        height: '80%',
        data: { _org_id: this.budget_income_detail.head._organization.id }
      })

    this.budgetinc_Rer.onClose.subscribe((spec: specification_income_detail) => {
      if (spec) {
        this.budget_income_detail.tbl.push(
          {
            _spec_income: {
              id: spec.id,
              code: spec.code,
              name_kaz: spec.name_kaz,
              name_rus: spec.name_rus
            },
            id: 0,
            summ: 0,
            _budjet_income: {
              id: 0,
              nom: '',
              org_name: ''
            }
          })
      }
    })
  }

  onDelete(_spec_income_id: number, _spec_income_name: string) {

    this.budgetincConfirmation.confirm({
      message: 'Вы действительно хотите удалить?',
      header: 'Удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = this.budget_income_detail.tbl.length - 1; i >= 0; i--) {
          let index = this.budget_income_detail.tbl.findIndex(item => _spec_income_id === item._spec_income.id)
          if (index !== -1) {
            this.budget_income_detail.tbl.splice(index, 1)
          }
        }
        this.budgetincConfirmation.close()
      },
      reject: () => {
        this.budgetincConfirmation.close();
      }
    });
  }

  


}
