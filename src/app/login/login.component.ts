import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChangepassComponent } from '../services/changepass/changepass.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private msgLogin: MessageService,
    private login_ref: DynamicDialogRef,
    private login_form: DialogService,) { }

  form: FormGroup
  loading = true

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Теперь вы можете зайти используя свои данные
      }
      else if (params['accessDenied']) {
        console.log('accessDenied');
      }
      else if (params['sessionfailed']) {
        console.log('Войди в систему заново');
      }
    })
  }

  login() {
    this.form.disable()
    this.auth.login(this.form.value)
      .subscribe(
        () => {
          this.router.navigate([''])
        },
        error => {
          this.form.enable(),
            this.auth.setToken('')
        }
      )
  }

  onSubmit() {
    this.login()
    let responce: any
    // sessionStorage.clear()
    // this.auth
    //   .clearToken(this.form.value)
    //   .subscribe(
    //     (data) => (
    //       responce = data,
    //       this.changepass(responce)
    //     ),
    //     error => {
    //       this.form.enable()
    //       this.msgLogin.add({
    //         severity: 'error', summary: 'Ошибка', detail: error.error.detail
    //       })
    //     }
    //   )
  }

  changepass(responce: any) {
    if (responce.changepass == 'True') {
      this.login_ref = this.login_form.open(ChangepassComponent,
        {
          header: 'Изменение пароля пользователя',
          width: 'calc(40%)',
          height: 'calc(40%)',
          data: { 'byToken': true },
          closable: true
        }
      )

      this.login_ref.onClose.subscribe((save: boolean) => {

        if (save) {
          this.form.enable(),
            sessionStorage.setItem('temp-token', ''),
            this.msgLogin.add({
              severity: 'success', summary: 'Успешно', detail: 'Пароль успешно изменен! Пожалуйста, войдите в систему заново!'
            })
        }
      })
    }
    else {
      this.login()
    }
  }
}
