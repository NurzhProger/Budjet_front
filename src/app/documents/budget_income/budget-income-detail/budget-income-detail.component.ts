import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { budget_income_detail, budget_income_head, budget_income_list } from '../budget_income_interfaces';
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
  @HostListener('window:keydown', ['$event'])

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F9') {
      if (this.selected.length > 0 ) {
        this.copySelectedRow()
        this.selected = []
      }

    }
  }

  izm: any;
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
  totalSum: number
  head: budget_income_head
  isTenge: boolean = true;
  tablisa: any = []
  selected: any
  

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

  fetch_detail() {
    this.budgetincService.fetch_detail(this.budjet_income_id)
      .subscribe(
        (detail) => {
          this.budget_income_detail = detail,
            this.preobGodNumber(),
            this.calculateTotalSum()
        }
      )
  }

  copySelectedRow() {
    if (this.selected) {
      this.budget_income_detail.tbl.push(
        {
          _spec_income: {
            id: this.selected[0]._spec_income.id,
            code: this.selected[0]._spec_income.code,
            name_kaz: this.selected[0]._spec_income.name_kaz,
            name_rus: this.selected[0]._spec_income.name_rus
          },
          id: 0,
          summ: this.selected[0].summ,
          _budjet_income: {
            id: this.selected[0]._budjet_income.id,
            nom: this.selected[0]._budjet_income.nom,
            org_name: this.selected[0]._budjet_income.org_name
          }
        })     
    }
  }


  onTableValuesChange() {
    this.calculateTotalSum();
  }
  calculateTotalSum() {
    this.budget_income_detail.head.summ = this.budget_income_detail.tbl.reduce((sum, row) => sum + row.summ, 0);
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
  
  // getValue(ri: number) {
  //   let baseValue = this.izm.summ || 0; 
  //   for (let i = 0; i < this.tablisa[ri].length; i++){
  //     if (this.isTenge) {
  //       return baseValue + ' тенге';
  //     } else {
  //       return (baseValue * 1000) + ' тенге'; 
  //     }
  //     }
  //   }
    


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

  editFKR(ri: number) {
    this.budgetinc_Rer = this.budgetIncDialog.open(SpecificationIncomeSelectComponent,
      {
        header: 'Выбор ФКР',
        width: '60%',
        height: '80%',
        data: { _org_id: this.budget_income_detail.head._organization.id }
      })
    this.budgetinc_Rer.onClose.subscribe((spec: specification_income_detail) => {
      if (spec) {
        this.budget_income_detail.tbl[ri]._spec_income = {
          id: spec.id,
          code: spec.code,
          name_kaz: spec.name_kaz,
          name_rus: spec.name_rus
        }
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
