import { Component, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../login/auth.service';
import { MenuModule } from 'primeng/menu';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MainService } from './main.service';
import { profileuser } from './interfaces';
import { ChangepassComponent } from '../../services/changepass/changepass.component';
import { UserhistoryDetailComponent } from '../userhistory-detail/userhistory-detail.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private mainservice: MainService,
    private config: PrimeNGConfig,
    private dialog_form: DialogService,
    private user_message: MessageService,
    private user_ref: DynamicDialogRef,
    private router: Router) { }

  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;
  @ViewChild('templateRef', { read: TemplateRef, static: true })
  templateRef: TemplateRef<any>;
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:mousemove', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    this.checkEvent()
  }

  onMouseMove(event: MouseEvent) {
    this.checkEvent()

  }

  checkEvent() {
    let newEventDatetime = new Date
    let raznica = (newEventDatetime.getTime() - this.lastEvent.getTime()) / 1000
    if (raznica > 30000) {

      if (this.quit == false) {
        this.quit = true
        this.user_message.add({
          severity: 'error', summary: 'Ошибка', detail: 'Время сессии истекло! Войдите заново!'
        })
        setTimeout(() => {
          this.logout()
        }, 2000)
      }


    }
    else {
      this.lastEvent = new Date;
    }
  }

  quit = false
  lastEvent = new Date()
  items: MegaMenuItem[];
  mass_tabs: string[] = [];
  tabcount = 0;
  number = '';
  counttabs = 0;
  User: MenuModule[];
  username = ''
  first = 0
  rows = 25
  history = []

  profileuser: profileuser = {
    user_id: '',
    username: '',
    first_name: '',
    org_id: '',
    org_name: '',
    budjet_id: '',
    budjet_name: ''
  }

  ngOnInit(): void {
    let responce: any

    this.mainservice
      .getinfo()
      .subscribe(
        (data) => (responce = data,
          this.profileuser.user_id = responce.user.id,
          this.profileuser.first_name = responce.user.first_name,
          this.profileuser.username = responce.user.username,
          this.profileuser.org_id = responce.profile._organization.id,
          this.profileuser.org_name = responce.profile._organization.name_rus,
          this.profileuser.budjet_id = responce.profile._organization._budjet_reg.id,
          this.profileuser.budjet_name = responce.profile._organization._budjet_reg.name_rus,
          this.history = responce.history,
          this.formMenu(),
          this.openTab('app-svod-list', "Свод бюджетной заявки", '', true))
      )

    this.config.setTranslation({
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      weak: 'Легкий',
      medium: 'Средний',
      strong: 'Сложный',
      passwordPrompt: 'Введите пароль',
      firstDayOfWeek: 1
    })
  }

  formMenu() {
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
                icon: 'pi pi-building',
                command: () => this.openTab('app-organization', 'Организации', '')
              },
              {
                label: 'Подразделения',
                icon: 'pi pi-align-center',              
                command: () => this.openTab('app-podrazdelenie-list', 'Подразделения', '')
              },
              {
                label: 'Пользователи',
                icon: 'pi pi-user',
                command: () => this.openTab('app-user-list', 'Пользователи', '')
              }]
            },
            {
              label: 'Служебные',
              items: [{
                label: 'Виды доплат и надбавок',
                icon: 'pi pi-caret-down',
                command: () => this.openTab('app-dopl-nadbavka-list', 'Виды доплат и надбавок', '')
              },
              {
                label: 'ЕНС ТРУ',
                icon: 'pi pi-list',
                command: () => this.openTab('app-enstru-list', 'ЕНС ТРУ', '')
              },
              {
                label: 'Отборочные ЕНС ТРУ',
                icon: 'pi pi-list',
                command: () => this.openTab('app-otbor-ens-list', 'Отборочные ЕНС ТРУ', '')
              },
              {
                label: 'Периодические показатели',
                icon: 'pi pi-calendar-plus',
                command: () => this.openTab('app-period-pokaz-list', 'Периодические показатели', '')
              },
              {
                label: 'Марки авто',
                icon: 'pi pi-car',
                command: () => this.openTab('app-marki-avto-list', 'Марки авто', '')
              },
              {
                label: 'Области',
                icon: 'pi pi-map-marker',
                command: () => this.openTab('app-oblasti-regiony-list', 'Области', '')
              },
              {
                label: 'Регионы',
                icon: 'pi pi-sitemap',
                command: () => this.openTab('app-regions-list', 'Регионы', '')
              },
              {
                label: 'Единицы измерения',
                icon: 'pi pi-sliders-v',
                command: () => this.openTab('app-ed-izm-list', 'Единицы измерения', '')
              },
              {
                label: 'Бюджеты регионов',
                icon: 'pi pi-server',
                command: () => this.openTab('app-budjet-reg-list', 'Бюджеты регионов', '')
              }]
            }
          ],
          [
            {
              label: 'Категория',
              items: [{
                label: 'Категория сотрудника',
                icon: 'pi pi-sort-alpha-down',
                command: () => this.openTab('app-category-sotr-list', 'Категория сотрудника', '')
              },
              {
                label: 'Стаж категории',
                icon: 'pi pi-sort-amount-down-alt',
                command: () => this.openTab('app-stazh-category-list', 'Стаж категории', '')
              },
              {
                label: 'Коэффициент категории',
                icon: 'pi pi-sort-numeric-down-alt',
                command: () => this.openTab('app-koeff-category-list', 'Коэффициент категории', '')
              },
              {
                label: 'Должности',
                icon: 'pi pi-users',
                command: () => this.openTab('app-dolznost-list', 'Должности', '')
              },
              {
                label: 'Шаблон формы',
                icon: 'pi pi-table',
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
                icon: 'pi pi-slack',
                command: () => this.openTab('app-functional-group-list', 'Функциональные группы', '', true)
              }, {
                label: 'Функциональные подгруппы',
                icon: 'pi pi-slack',
                command: () => this.openTab('app-functional-podgroup-list', 'Функциональные подгруппы', '', true)
              },
              {
                label: 'АБП',
                icon: 'pi pi-eject',
                command: () => this.openTab('app-abp-list', 'АБП', '', true)
              },
              {
                label: 'Программы',
                icon: 'pi pi-list',
                command: () => this.openTab('app-programm-list', 'Программы', '', true)
              }, {
                label: 'Подпрограммы',
                icon: 'pi pi-list',
                command: () => this.openTab('app-podprogramm-list', 'Подпрограммы', '', true)
              }, {
                label: 'ФКР',
                icon: 'pi pi-sliders-h',
                command: () => this.openTab('app-fkr-list', 'ФКР', '', true)
              }, {
                label: 'Спецификации',
                icon: 'pi pi-sliders-h',
                command: () => this.openTab('app-specification-exp-list', 'Спецификации', '')
              }]
            }
          ],
          [
            {
              label: 'Доходы',
              items: [{
                label: 'Категории',
                icon: 'pi pi-database',
                command: () => this.openTab('app-category-income', 'Категории', '')
              }, {
                label: 'Классы',
                icon: 'pi pi-chart-bar',
                command: () => this.openTab('app-class-income-list', 'Классы', '')
              }, {
                label: 'Подклассы',
                icon: 'pi pi-chart-bar',
                command: () => this.openTab('app-podclass-list', 'Подклассы', '')
              }, {
                label: 'Специфика поступления',
                icon: 'pi pi-cloud-download',
                command: () => this.openTab('app-specification-income-list', 'Спецификации', '')
              }, {
                label: 'Бюджет',
                icon: 'pi pi-dollar',
                command: () => this.openTab('app-budjet-list', 'Бюджет', '')
              }, {
                label: 'Классификации',
                icon: 'pi pi-book',
                command: () => this.openTab('app-classification-income-list', 'Классификации', '', true)
              }]
            }
          ]
        ]
      },
      {
        label: 'Документы',
        icon: 'pi pi-fw pi-file',
        items: [
          [
            {
              label: 'Документы',
              items: [{
                label: 'Бюджетная заявка',
                icon: 'pi pi-angle-double-right',
                command: () => this.openTab('app-budget-request-list', 'Бюджетная заявка', '')
              },
              {
                label: 'Лимит на годовой бюджет',
                icon: 'pi pi-angle-double-right',
                command: () => this.openTab('app-limit-list', 'Лимит на годовой бюджет', '')
              },
              // {
              //   label: 'Свод бюджетной заявки',
              //   command: () => this.openTab('app-svod-list', 'Свод бюджетной заявки', '', false)
              // },
              {
                label: 'Бюджетная заявка поступлений',
                icon: 'pi pi-angle-double-right',
                command: () => this.openTab('app-budget-income-list', 'Бюджетная заявка поступлений', '')
              },
              {
                label: 'Заключение по бюджетным заявкам',
                icon: 'pi pi-angle-double-right',
                command: () => this.openTab('app-zakluchenie-list', 'Заключение по бюджетным заявкам', '')
              }
              ]
            }
          ]
        ]
      },
      {
        label: 'Отчеты',
        icon: 'pi pi-fw pi-folder',
        items: [
          [
            {
              label: 'Приложения',
              items: [{
                label: 'Приложение 60',
                icon: 'pi pi-bars',
                command: () => this.openTab('app-prilozhenie60-new', 'Приложение 60', '')
              },
              {
                label: 'Приложение №57, 58',
                icon: 'pi pi-bars',
                command: () => this.openTab('app-prilozhenie5758', 'Приложение №57, 58', '')
              }]
            }
          ]
        ]
      },
      // {
      //   label: 'Quit',
      //   icon: 'pi pi-fw pi-power-off',
      //   command: () => this.logout()
      // }
    ]
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
    this.user_ref = this.dialog_form.open(ChangepassComponent, {
      header: 'Изменение пароля пользователя',
      width: 'calc(40%)',
      height: 'calc(40%)',
      closable: true
    }),
      this.user_ref.onClose.subscribe((success: boolean) => {

        if (success) {

          setTimeout(() => {
            sessionStorage.clear(),
              this.auth.setToken(''),
              this.router.navigate(['login'])
          }, 1500)
        }
      })
  }

  userHistory() {
    this.user_ref = this.dialog_form.open(UserhistoryDetailComponent, {
      header: 'История входа учетной записи',
      width: 'calc(50%)',
      height: 'calc(50%)',
      closable: true,
      data: { history: this.history }
    })
  }

  logout() {
    this.auth.logout().
      subscribe(
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

