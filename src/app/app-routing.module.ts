import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component/main.component';
import { AuthGuard } from './classes/auth.guard';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { path: '', canActivate: [AuthGuard], component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
