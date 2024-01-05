import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component/main.component';
import { SkeletonComponent } from './loader/skeleton/skeleton.component'
import { PrimeModules } from './primeng.module'
import { MegaMenuModule } from 'primeng/megamenu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TokenInterceptor } from './classes/token.interceptor';
// income
import { CategoryIncomeDetailComponent } from './directory/income/category-income/category-income-detail/category-income-detail.component';
import { CategoryIncomeComponent } from './directory/income/category-income/category_income-list/category-income.component';
import { ClassIncomeListComponent } from './directory/income/class-income/class-income-list/class-income-list.component';
import { ClassIncomeDetailComponent } from './directory/income/class-income/class-income-detail/class-income-detail.component';
import { ClassificationIncomeListComponent } from './directory/income/classification-income/classification-income-list/classification-income-list.component';
import { ClassificationIncomeDetailComponent } from './directory/income/classification-income/classification-income-detail/classification-income-detail.component';

//dirs/expenses

import { OrganizationComponent } from './directory/organization/organization-list/organization.component';
import { OrganizationDetailComponent } from './directory/organization/organization-detail/organization-detail.component';
import { PodclassListComponent } from './directory/income/podclass/podclass-list/podclass-list.component';
import { PodclassDetailComponent } from './directory/income/podclass/podclass-detail/podclass-detail.component';
import { BudjetListComponent } from './directory/income/budjet/budjet-list/budjet-list.component';
import { IzmIncDocDetailComponent } from './documents/income/izm_inc_doc/izm-inc-doc-detail/izm-inc-doc-detail.component';
import { IzmIncDocListComponent } from './documents/income/izm_inc_doc/izm-inc-doc-list/izm-inc-doc-list.component';
import { FunctionalGroupDetailComponent } from './directory/expenses/functional-group/functional-group-detail/functional-group-detail.component';
import { FunctionalGroupListComponent } from './directory/expenses/functional-group/functional-group-list/functional-group-list.component';
import { FunctionalGroupSelectComponent } from './directory/expenses/functional-group/functional-group-select/functional-group-select.component';
import { FunctionalPodgroupDetailComponent } from './directory/expenses/functional-podgroup/functional-podgroup-detail/functional-podgroup-detail.component';
import { FunctionalPodgroupListComponent } from './directory/expenses/functional-podgroup/functional-podgroup-list/functional-podgroup-list.component';
import { FunctionalPodgroupSelectComponent } from './directory/expenses/functional-podgroup/functional-podgroup-select/functional-podgroup-select.component';
import { ABPListComponent } from './directory/expenses/ABP/abp-list/abp-list.component';
import { ABPSelectComponent } from './directory/expenses/ABP/abp-select/abp-select.component';
import { ABPDetailComponent } from './directory/expenses/ABP/abp-detail/abp-detail.component';
import { ProgrammListComponent } from './directory/expenses/programm/programm-list/programm-list.component';
import { ProgrammSelectComponent } from './directory/expenses/programm/programm-select/programm-select.component';
import { ProgrammDetailComponent } from './directory/expenses/programm/programm-detail/programm-detail.component';
import { PodprogrammDetailComponent } from './directory/expenses/podprogramm/podprogramm-detail/podprogramm-detail.component';
import { PodprogrammListComponent } from './directory/expenses/podprogramm/podprogramm-list/podprogramm-list.component';
import { PodprogrammSelectComponent } from './directory/expenses/podprogramm/podprogramm-select/podprogramm-select.component';
import { FkrDetailComponent } from './directory/expenses/fkr/fkr-detail/fkr-detail.component';
import { FkrListComponent } from './directory/expenses/fkr/fkr-list/fkr-list.component';
import { FkrSelectComponent } from './directory/expenses/fkr/fkr-select/fkr-select.component';
import { SpecificationIncomeListComponent } from './directory/income/specification-income/specification-income-list/specification-income-list.component';
import { SpecificationIncomeDetailComponent } from './directory/income/specification-income/specification-income-detail/specification-income-detail.component';
import { Import219ListComponent } from './documents/import_document/import219/import219-list/import219-list.component';
import { Import219DeteailComponent } from './documents/import_document/import219/import219-deteail/import219-deteail.component';
import { UploadComponent } from './documents/import_document/import219/upload/upload.component';
import { SpecificationExpListComponent } from './directory/expenses/specification-exp/specification-exp-list/specification-exp-list.component';
import { SpecificationExpDetailComponent } from './directory/expenses/specification-exp/specification-exp-detail/specification-exp-detail.component';
import { SpecificationExpSelectComponent } from './directory/expenses/specification-exp/specification-exp-select/specification-exp-select.component';
import { BudjetSelectComponent } from './directory/income/budjet/budjet-select/budjet-select.component';
import { CategoryIncomeSelectComponent } from './directory/income/category-income/category_income-select/category-income-select.component';
import { ClassIncomeSelectComponent } from './directory/income/class-income/class-income-select/class-income-select.component';
import { ClassificationIncomeSelectComponent } from './directory/income/classification-income/classification-income-select/classification-income-select.component';
import { PodclassSelectComponent } from './directory/income/podclass/podclass-select/podclass-select.component';
import { SpecificationIncomeSelectComponent } from './directory/income/specification-income/specification-income-select/specification-income-select.component';
import { OrganizationSelectComponent } from './directory/organization/organization-select/organization-select.component';
import { CategorySotrListComponent } from './directory/planirovanie/category-sotr/category-sotr-list/category-sotr-list.component';
import { CategorySotrElementComponent } from './directory/planirovanie/category-sotr/category-sotr-element/category-sotr-element.component';
import { KoeffCategoryListComponent } from './directory/planirovanie/koeff-category/koeff-category-list/koeff-category-list.component';
import { StazhCategoryElementComponent } from './directory/planirovanie/stazh-category/stazh-category-element/stazh-category-element.component';
import { StazhCategoryListComponent } from './directory/planirovanie/stazh-category/stazh-category-list/stazh-category-list.component';
import { KoeffElementComponent } from './directory/planirovanie/koeff-category/koeff-element/koeff-element.component';
import { PodrazdelenieElementComponent } from './directory/podrazdelenie/podrazdelenie-element/podrazdelenie-element.component';
import { PodrazdelenieListComponent } from './directory/podrazdelenie/podrazdelenie-list/podrazdelenie-list.component';
import { DolznostElementComponent } from './directory/planirovanie/dolzhnost/dolznost-element/dolznost-element.component';
import { DolznostListComponent } from './directory/planirovanie/dolzhnost/dolznost-list/dolznost-list.component';
import { TipDoplComponent } from './enums/tip_dopl/tip-dopl/tip-dopl.component';
import { DoplNadbavkaElementComponent } from './directory/planirovanie/dopl_nadbavka/dopl-nadbavka-element/dopl-nadbavka-element.component';
import { DoplNadbavkaListComponent } from './directory/planirovanie/dopl_nadbavka/dopl-nadbavka-list/dopl-nadbavka-list.component';
import { TipTruComponent } from './enums/tip_tru/tip-tru/tip-tru.component';
import { EnstruListComponent } from './directory/planirovanie/ensTRU/enstru-list/enstru-list.component';
import { EnstruElementComponent } from './directory/planirovanie/ensTRU/enstru-element/enstru-element.component';
import { FormlistComponent } from './directory/income/forms/formlist/formlist.component';
import { FormDetailComponent } from './directory/income/forms/form-detail/form-detail.component';
import { PeriodPokazElementComponent } from './directory/planirovanie/period-pokaz/period-pokaz-element/period-pokaz-element.component';
import { PeriodPokazListComponent } from './directory/planirovanie/period-pokaz/period-pokaz-list/period-pokaz-list.component';
import { StavkaListComponent } from './enums/stavka/stavka-list/stavka-list.component';
import { TipToplivaComponent } from './enums/tip_topliva/tip-topliva/tip-topliva.component';
import { VidTransportaComponent } from './enums/vid_transporta/vid-transporta/vid-transporta.component';
import { MarkiAvtoElementComponent } from './directory/planirovanie/marki_avto/marki-avto-element/marki-avto-element.component';
import { MarkiAvtoListComponent } from './directory/planirovanie/marki_avto/marki-avto-list/marki-avto-list.component';
import { OblastiRegionyElementComponent } from './directory/planirovanie/oblasti-regiony/oblasti-regiony-element/oblasti-regiony-element.component';
import { OblastiRegionyListComponent } from './directory/planirovanie/oblasti-regiony/oblasti-regiony-list/oblasti-regiony-list.component';
import { EdIzmListComponent } from './directory/planirovanie/ed-izm/ed-izm-list/ed-izm-list.component';
import { EdIzmElementComponent } from './directory/planirovanie/ed-izm/ed-izm-element/ed-izm-element.component';
import { RegionsElementComponent } from './directory/planirovanie/regions/regions-element/regions-element.component';
import { RegionsListComponent } from './directory/planirovanie/regions/regions-list/regions-list.component';
import { BudjetRegListComponent } from './directory/planirovanie/budjet-reg/budjet-reg-list/budjet-reg-list.component';
import { BudjetRegElementComponent } from './directory/planirovanie/budjet-reg/budjet-reg-element/budjet-reg-element/budjet-reg-element.component';
import { BudgetRequestListComponent } from './documents/Budget_request/budget-request-list/budget-request-list.component';
import { BudgetRequestDetailComponent } from './documents/Budget_request/budget-request-detail/budget-request-detail.component';
import { BudgetRas4etDetailComponent } from './documents/Budget_Ras4et/budget-ras4et-detail/budget-ras4et-detail.component';
import { LimitListComponent } from './documents/Limit/limit-list/limit-list.component';
import { LimitElementComponent } from './documents/Limit/limit-element/limit-element.component';
import { Prilozhenie60Component } from './reports/prilozhenie60/prilozhenie60.component';
import { FormSelectComponent } from './directory/income/forms/form-select/form-select.component';
import { VidRashodaComponent } from './enums/vid_rashoda/vid-rashoda/vid-rashoda.component';
import { VidOperaciiComponent } from './enums/vid_operacii/vid-operacii/vid-operacii.component';
import { VidDannyhComponent } from './enums/vid_dannyh/vid-dannyh/vid-dannyh.component';
import { TipSposobRas4etaComponent } from './enums/tip-sposob-ras4eta/tip-sposob-ras4eta.component';
import { Ras4etPrintFormComponent } from './documents/Budget_Ras4et/ras4et-print-form/ras4et-print-form/ras4et-print-form.component';
import { Prilozhenie60NewComponent } from './reports/prilozhenie_60/prilozhenie60-new/prilozhenie60-new.component';
import { Prilozhenie5758Component } from './reports/prilozhenie_57_58/prilozhenie5758/prilozhenie5758.component';
import { UserDetailComponent } from './directory/user/user-detail/user-detail.component';
import { UserListComponent } from './directory/user/user-list/user-list.component';
import { SelectDoplataComponent } from './documents/Budget_Ras4et/select-doplata/select-doplata.component';
import { EnstruSelectComponent } from './directory/planirovanie/ensTRU/enstru-select/enstru-select.component';
import { StazhCategorySelectComponent } from './directory/planirovanie/stazh-category/stazh-category-select/stazh-category-select.component';
import { CategorySotrSelectComponent } from './directory/planirovanie/category-sotr/category-sotr-select/category-sotr-select.component';
import { DolznostSelectComponent } from './directory/planirovanie/dolzhnost/dolzhnost-select/dolzhnost-select.component';
import { PodrazdelenieSelectComponent } from './directory/podrazdelenie/podrazdelenie-select/podrazdelenie-select.component';
import { OblastiRegionySelectComponent } from './directory/planirovanie/oblasti-regiony/oblasti-regiony-select/oblasti-regiony-select.component';
import { EdIzmSelectComponent } from './directory/planirovanie/ed-izm/ed-izm-select/ed-izm-select.component';
import { MarkiAvtoSelectComponent } from './directory/planirovanie/marki_avto/marki-avto-select/marki-avto-select.component';
import { DoplNadbavkaSelectComponent } from './directory/planirovanie/dopl_nadbavka/dopl-nadbavka-select/dopl-nadbavka-select.component';
import { ChangepassComponent } from './services/changepass/changepass.component';
import { StartPageComponent } from './main/startpage/startpage.component';
import { UserhistoryDetailComponent } from './main/userhistory-detail/userhistory-detail.component';
import { PeriodDetailComponent } from './directory/period/period-detail/period-detail.component';
import { SvodListComponent } from './documents/svod-doc/svod-list/svod-list.component';
import { SvodDetailComponent } from './documents/svod-doc/svod-detail/svod-detail.component';
import { BudjetRequestSelectComponent } from './documents/Budget_request/budjet-request-select/budjet-request-select/budjet-request-select.component';
import { BudgetIncomeListComponent } from './documents/budget_income/budget-income-list/budget-income-list.component';
import { BudgetIncomeDetailComponent } from './documents/budget_income/budget-income-detail/budget-income-detail.component';
import { ZakluchenieListComponent } from './documents/zakluchenie/zakluchenie-list/zakluchenie-list.component';
import { ZakluchenieDetailComponent } from './documents/zakluchenie/zakluchenie-detail/zakluchenie-detail.component';
import { SelectRas4etComponent } from './documents/Budget_Ras4et/select-ras4et/select-ras4et.component';
import { OtborENSListComponent } from './directory/planirovanie/otborEnsTRU/otborENS_list/otbor-ens-list/otbor-ens-list.component';
import { OtborENSSelectComponent } from './directory/planirovanie/otborEnsTRU/otborENS_select/otbor-ens-select/otbor-ens-select.component';
import { OtborENSDetailComponent } from './directory/planirovanie/otborEnsTRU/otborENS-element/otbor-ens-detail/otbor-ens-detail.component';
import { SelectProgramComponent } from './reports/prilozhenie_57_58/select_program_report/select-program/select-program.component';
import { SelectPodprogramComponent } from './reports/prilozhenie_57_58/select_podprogram_report/select-podprogram/select-podprogram.component';
import { SelectSpecComponent } from './reports/prilozhenie_57_58/select_spec_report/select-spec/select-spec.component';
import { SafeHtmlPipe } from './documents/Budget_Ras4et/ras4et-print-form/ras4et-print-form/SafeHtmlPipe.pipe';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    PrimeModules,
    MegaMenuModule,
    AvatarModule,
    RouterModule.forRoot([{ path: 'login', component: LoginComponent }])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    OrganizationComponent,
    OrganizationSelectComponent,
    OrganizationDetailComponent,
    CategoryIncomeComponent,
    CategoryIncomeSelectComponent,
    SkeletonComponent,
    PodclassListComponent,
    PodclassSelectComponent,
    PodclassDetailComponent,
    CategoryIncomeDetailComponent,
    ClassIncomeListComponent,
    ClassIncomeSelectComponent,
    ClassIncomeDetailComponent,
    SpecificationIncomeListComponent,
    SpecificationIncomeSelectComponent,
    SpecificationIncomeDetailComponent,
    ClassificationIncomeListComponent,
    ClassificationIncomeSelectComponent,
    ClassificationIncomeDetailComponent,
    SkeletonComponent,
    BudjetListComponent,
    BudjetSelectComponent,
    FunctionalGroupListComponent,
    FunctionalGroupSelectComponent,
    FunctionalGroupDetailComponent,
    FunctionalPodgroupListComponent,
    FunctionalPodgroupDetailComponent,
    FunctionalPodgroupSelectComponent,
    ABPListComponent,
    ABPSelectComponent,
    ABPDetailComponent,
    ProgrammListComponent,
    ProgrammDetailComponent,
    ProgrammSelectComponent,
    PodprogrammListComponent,
    PodprogrammSelectComponent,
    PodprogrammDetailComponent,
    FkrListComponent,
    FkrSelectComponent,
    FkrDetailComponent,
    SkeletonComponent,
    IzmIncDocDetailComponent,
    IzmIncDocListComponent,
    Import219ListComponent,
    Import219DeteailComponent,
    UploadComponent,
    SpecificationExpListComponent,
    SpecificationExpSelectComponent,
    SpecificationExpDetailComponent,
    CategorySotrListComponent,
    CategorySotrElementComponent,
    CategorySotrSelectComponent,
    KoeffCategoryListComponent,
    StazhCategoryElementComponent,
    StazhCategoryListComponent,
    StazhCategorySelectComponent,
    KoeffElementComponent,
    PodrazdelenieElementComponent,
    PodrazdelenieListComponent,
    PodrazdelenieSelectComponent,
    DolznostElementComponent,
    DolznostListComponent,
    DolznostSelectComponent,
    TipDoplComponent,
    DoplNadbavkaElementComponent,
    DoplNadbavkaListComponent,
    DoplNadbavkaSelectComponent,
    TipTruComponent,
    EnstruListComponent,
    EnstruElementComponent,
    EnstruSelectComponent,
    FormlistComponent,
    FormDetailComponent,
    PeriodPokazElementComponent,
    PeriodPokazListComponent,
    StavkaListComponent,
    TipToplivaComponent,
    VidTransportaComponent,
    MarkiAvtoElementComponent,
    MarkiAvtoListComponent,
    MarkiAvtoSelectComponent,
    OblastiRegionyElementComponent,
    OblastiRegionyListComponent,
    OblastiRegionySelectComponent,
    EdIzmListComponent,
    EdIzmElementComponent,
    EdIzmSelectComponent,
    RegionsElementComponent,
    RegionsListComponent,
    BudjetRegListComponent,
    BudjetRegElementComponent,
    BudgetRequestListComponent,
    BudgetRequestDetailComponent,
    BudgetRas4etDetailComponent,
    LimitListComponent,
    LimitElementComponent,
    Prilozhenie60Component,
    FormSelectComponent,
    VidRashodaComponent,
    VidOperaciiComponent,
    VidDannyhComponent,
    TipSposobRas4etaComponent,
    Ras4etPrintFormComponent,
    Prilozhenie60NewComponent,
    Prilozhenie5758Component,
    UserDetailComponent,
    UserListComponent,
    SelectDoplataComponent,
    ChangepassComponent,
    StartPageComponent,
    UserhistoryDetailComponent,
    PeriodDetailComponent,
    SvodListComponent,
    SvodDetailComponent,
    BudgetIncomeListComponent,
    BudgetIncomeDetailComponent,
    BudjetRequestSelectComponent,
    ZakluchenieListComponent,
    ZakluchenieDetailComponent,
    SelectRas4etComponent,
    OtborENSListComponent,
    OtborENSSelectComponent,
    OtborENSDetailComponent,
    SelectProgramComponent,
    SelectPodprogramComponent,
    SelectSpecComponent,
    SafeHtmlPipe],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    MessageService,
    ConfirmationService
  ]
})
export class AppModule { }
