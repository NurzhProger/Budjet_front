import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../login/auth.service';
import { MenuModule } from 'primeng/menu';
import { UserComponent } from '../user/user.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private config: PrimeNGConfig,
    private dialog_form: DialogService,
    private user_massage: MessageService,
    private user_ref: DynamicDialogRef,
    private router: Router) { }

  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;
  @ViewChild('templateRef', { read: TemplateRef, static: true })
  templateRef: TemplateRef<any>;

  items: MegaMenuItem[];
  mass_tabs: string[] = [];
  tabcount = 0;
  number = '';
  counttabs = 0;
  User: MenuModule[];
  username = ''

  ngOnInit(): void {
    this.User = [

      { label: 'Изменить пароль', icon: 'pi pi-fw pi-lock', command: this.changepass },
      { label: 'Выйти из системы', icon: 'pi pi-fw pi-power-off', command: this.logout }
    ]
    const username = sessionStorage.getItem("username");
    this.username = username !== null ? username : '';

    this.items = [
      {
        label: 'Справочники',
        icon: 'pi pi-fw pi-folder',
        items: [
          [
            {
              label: 'Организация',
              items: [{
                label: 'Организации',
                command: () => this.openTab('app-organization', 'Организации', '')
              },
              {
                label: 'Подразделения',
                command: () => this.openTab('app-podrazdelenie-list', 'Подразделения', '')
              }]
            },
            {
              label: 'Служебные',
              items: [{
                label: 'Виды доплат и надбавок',
                command: () => this.openTab('app-dopl-nadbavka-list', 'Виды доплат и надбавок', '')
              },
              {
                label: 'ЕНС ТРУ',
                command: () => this.openTab('app-enstru-list', 'ЕНС ТРУ', '')
              },
              {
                label: 'Периодические показатели',
                command: () => this.openTab('app-period-pokaz-list', 'Периодические показатели', '')
              },
              {
                label: 'Марки авто',
                command: () => this.openTab('app-marki-avto-list', 'Марки авто', '')
              }]
            }
          ],
          [
            {
              label: 'Категория',
              items: [{
                label: 'Категория сотрудника',
                command: () => this.openTab('app-category-sotr-list', 'Категория сотрудника', '')
              },
              {
                label: 'Стаж категории',
                command: () => this.openTab('app-stazh-category-list', 'Стаж категории', '')
              },
              {
                label: 'Коэффициент категории',
                command: () => this.openTab('app-koeff-category-list', 'Коэффициент категории', '')
              },
              {
                label: 'Должности',
                command: () => this.openTab('app-dolznost-list', 'Должности', '')
              },
              {
                label: 'Шаблон формы',
                command: () => this.openTab('app-formlist', 'Шаблон формы', '')
              },
              ]
            }
          ],
          [
            {
              label: 'Расходы',
              items: [{
                label: 'Функциональные группы',
                command: () => this.openTab('app-functional-group-list', 'Функциональные группы', '', true)
              }, {
                label: 'Функциональные подгруппы',
                command: () => this.openTab('app-functional-podgroup-list', 'Функциональные подгруппы', '', true)
              },
              {
                label: 'АБП',
                command: () => this.openTab('app-abp-list', 'АБП', '', true)
              },
              {
                label: 'Программы',
                command: () => this.openTab('app-programm-list', 'Программы', '', true)
              }, {
                label: 'Подпрограммы',
                command: () => this.openTab('app-podprogramm-list', 'Подпрограммы', '', true)
              }, {
                label: 'ФКР',
                command: () => this.openTab('app-fkr-list', 'ФКР', '', true)
              }, {
                label: 'Спецификации',
                command: () => this.openTab('app-specification-exp-list', 'Спецификации', '')
              }]
            }
          ],
          [
            {
              label: 'Доходы',
              items: [{
                label: 'Категории',
                command: () => this.openTab('app-category-income', 'Категории', '')
              }, {
                label: 'Классы',
                command: () => this.openTab('app-class-income-list', 'Классы', '')
              }, {
                label: 'Подклассы',
                command: () => this.openTab('app-podclass-list', 'Подклассы', '')
              }, {
                label: 'Спецификации',
                command: () => this.openTab('app-specification-income-list', 'Спецификации', '')
              }, {
                label: 'Бюджет',
                command: () => this.openTab('app-budjet-list', 'Бюджет', '')
              }, {
                label: 'Классификации',
                command: () => this.openTab('app-classification-income-list', 'Классификации', '', true)
              }]
            }
          ]
        ]
      },
      // {
      //   label: 'Документы',
      //   icon: 'pi pi-fw pi-file',
      //   items: [
      //     [
      //       {
      //         label: 'Поступления',
      //         items: [{
      //           label: 'Утвержденный план по поступлениям',
      //           command: () => this.openTab('app-utv-income-list', 'Утвержденный план по поступлениям', '')
      //         }, {
      //           label: 'Изменения плана по поступлениям',
      //           command: () => this.openTab('app-izm-inc-doc-list', 'Изменения плана по поступлениям', '')
      //         }]
      //       }
      //     ],
      //     [
      //       {
      //         label: 'Расходы',
      //         items: [{
      //           label: 'Утвержденный план по расходам',
      //           command: () => this.openTab('app-utv-exp-doc-list', 'Утвержденный план по расходам', '')
      //         }, {
      //           label: 'Изменения плана по расходам',
      //           command: () => this.openTab('app-izm-inc-doc-list', 'Изменения плана по поступлениям', '')
      //         }]
      //       }
      //     ],
      //     [
      //       {
      //         label: 'Импорт данных',
      //         items: [{
      //           label: 'Импорт формы 2-19',
      //           command: () => this.openTab('app-import219-deteail', 'Импорт формы 2-19', '')
      //         }]
      //       }
      //     ]
      //   ]
      // },
      {
        label: 'Перечисления',
        icon: 'pi pi-fw pi-file',
        items: [
          [
            {
              label: 'Перечисления',
              items: [{
                label: 'Тип доплат',
                command: () => this.openTab('app-tip-dopl', 'Тип доплат', '')
              },
              {
                label: 'Тип ТРУ',
                command: () => this.openTab('app-tip-tru', 'Тип ТРУ', '')
              },
              {
                label: 'Показатели',
                command: () => this.openTab('app-stavka-list', 'Показатели', '')
              },
              {
                label: 'Тип топлива',
                command: () => this.openTab('app-tip-topliva', 'Тип топлива', '')
              },
              {
                label: 'Вид транспорта',
                command: () => this.openTab('app-vid-transporta', 'Вид транспорта', '')
              }]
            }
          ],
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout()
      }
    ]

    this.config.setTranslation({
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      firstDayOfWeek: 1
    })



  }

  openTab(nameselector: string, nametitle: string, id: string, data?: any) {
    let flag = 0;
    //Предварителная проверка существования вкладки
    this.mass_tabs.forEach((element, index) => {
      if (element == nametitle) {
        flag = index  //если открыта. то передаем индекс
      }
    });

    //если флаг больше 0, тогда открываем уже существующую, передав индекс
    if (flag > 0) {
      this.tabcount = flag
    }
    //иначе если = 0 тогда создаем новую вкладку
    else {
      this.mass_tabs.push(nametitle);
      this.number = id;
      this.viewContainerRef.createEmbeddedView(this.templateRef, { context: { selector: nameselector, title: nametitle, data: data } });
      this.counttabs++
      this.tabcount = this.counttabs - 1;
    }

  }

  changepass() {
    this.user_ref = this.dialog_form.open(UserComponent,
      {
        header: 'Изменение пароля пользователя',
        width: 'calc(40%)',
        height: 'calc(30%)',
        closable: true
      });

    this.user_ref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.user_massage.add({ severity: 'success', summary: 'Успешно', detail: 'Пароль изменен! Войдите, пожалуйста, в систему!' }),
          this.router.navigate(['login'])
      }
    });
  }

  logout() {
    this.auth.logout().subscribe(
      () => this.router.navigate(['login']),
      error => {
        console.warn(console.error())
      }
    )
  }

  removetab() {
    if (this.tabcount > 0) {
      this.counttabs--
      this.viewContainerRef.detach(this.tabcount)?.destroy;
      this.mass_tabs.splice(this.tabcount, 1);
    }
  }
}

