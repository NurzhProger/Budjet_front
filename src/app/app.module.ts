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
import { MainComponent } from './main/main.component';
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
import { UtvIncomeListComponent } from './documents/income/utv-income/utv-income-list/utv-income-list.component';
import { UtvIncomeDetailComponent } from './documents/income/utv-income/utv-income-detail/utv-income-detail.component';

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
import { UserComponent } from './user/user.component';
import { UtvExpDocListComponent } from './documents/expenses/utv-exp-doc/utv-exp-doc-list/utv-exp-doc-list.component';
import { UtvExpDocDetailComponent } from './documents/expenses/utv-exp-doc/utv-exp-doc-detail/utv-exp-doc-detail.component';
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
<<<<<<< Updated upstream
import { FormDetailComponent } from './directory/income/forms/form-detail/form-detail.component';
=======
import { PeriodPokazElementComponent } from './directory/planirovanie/period-pokaz/period-pokaz-element/period-pokaz-element.component';
import { PeriodPokazListComponent } from './directory/planirovanie/period-pokaz/period-pokaz-list/period-pokaz-list.component';
>>>>>>> Stashed changes


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
    UtvIncomeListComponent,
    UtvIncomeDetailComponent,
    UtvExpDocListComponent,
    UtvExpDocDetailComponent,
    SkeletonComponent,
    IzmIncDocDetailComponent,
    IzmIncDocListComponent,
    Import219ListComponent,
    Import219DeteailComponent,
    UploadComponent,
    SpecificationExpListComponent,
    SpecificationExpSelectComponent,
    SpecificationExpDetailComponent,
    UserComponent,
    CategorySotrListComponent,
    CategorySotrElementComponent,
    KoeffCategoryListComponent,
    StazhCategoryElementComponent,
    StazhCategoryListComponent,
    KoeffElementComponent,
    PodrazdelenieElementComponent,
    PodrazdelenieListComponent,
    DolznostElementComponent,
    DolznostListComponent,
    TipDoplComponent,
    DoplNadbavkaElementComponent,
    DoplNadbavkaListComponent,
    TipTruComponent,
    EnstruListComponent,
    EnstruElementComponent,
    FormlistComponent,
<<<<<<< Updated upstream
    FormDetailComponent],
=======
    PeriodPokazElementComponent,
    PeriodPokazListComponent],
>>>>>>> Stashed changes
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
