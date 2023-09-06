import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { period_pokaz_element } from '../interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StavkaService } from 'src/app/enums/stavka/stavka-list/stavka.service'
import { MessageService } from 'primeng/api';
import { PeriodPokazService } from 'src/app/directory/planirovanie/period-pokaz/period-pokaz.service'
import { PeriodPokazListComponent } from '../period-pokaz-list/period-pokaz-list.component';

@Component({
  selector: 'app-period-pokaz-element',
  templateUrl: './period-pokaz-element.component.html',
  styleUrls: ['./period-pokaz-element.component.css']
})
export class PeriodPokazElementComponent implements OnInit {

  constructor(
    private period_pokaz_dialog_ref: DynamicDialogRef,
    private StavkaService: StavkaService,
    private messageServiceadd: MessageService,
    private PeriodPokazService: PeriodPokazService,
    private periodpokaz_massage: MessageService,
    private period_pokaz_dialog_config: DynamicDialogConfig
  ) { }
  form: FormGroup
  tip_options: any =[];
  period_pokaz_list: PeriodPokazListComponent;
  period_pokaz_element: period_pokaz_element = {
    id: 0,
    period: '',
    znachenie: 0,
    _pokazatel: ''
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      period: new FormControl(null, [Validators.required]),
      znachenie: new FormControl(null, [Validators.required]),
      _pokazatel: new FormControl(null, [Validators.required])
    })
    this.period_pokaz_element.id = this.period_pokaz_dialog_config.data.periodpokaz_id;
    
    if (this.period_pokaz_element.id !== 0) {
      this.PeriodPokazService.fetchPeriodPokaz(this.period_pokaz_element.id)
        .subscribe(
          (data) => (
              this.period_pokaz_element = data
            )
        )
            
    }
    this.selectTip()
  }

  savePeriod() {
    if (this.period_pokaz_element.id == 0){      
      this.PeriodPokazService.add(this.period_pokaz_element)
        .subscribe(
          (data) => (
            this.periodpokaz_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Период показателей сохранен!' })
          ),
          (error) => (this.periodpokaz_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
     else {
          this.PeriodPokazService.edit(this.period_pokaz_element)
          .subscribe((data) => (
            this.periodpokaz_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Период показателей сохранен!' })
          ),
          (error) => (this.periodpokaz_massage.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }
    this.closePeriod(true);
    this.period_pokaz_list.fetchList()
  }

  closePeriod(save:boolean) {
    this.period_pokaz_dialog_ref.close(save);
  }

  selectTip() {
    let responce: any;
    this.StavkaService.fetch().subscribe(
      (data) => (responce = data, this.tip_options = responce.results
      ),
        (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

}
