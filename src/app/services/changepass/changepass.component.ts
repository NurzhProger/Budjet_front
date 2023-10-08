import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { changePassService } from './changepass.service'

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(
    private changePassService: changePassService,
    private change_pass_msg: MessageService,
    private change_pass_ref: DynamicDialogRef,
    private change_pass__conf: DynamicDialogConfig) {
    this.byToken = this.change_pass__conf.data?.byToken || false
  }

  byToken = false
  temp_token = ''
  newpassword: string = '';
  secondpassword = ''
  changepass: boolean = false;

  form: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.uppercaseLetterValidator(),
        this.lowcaseLetterValidator(),
        this.NumberValidator(),
        this.SpecSimvolValidator()])
    })


  }

  uppercaseLetterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value as string;

      if (value == '') {
        return { uppercaseLetter: true }
      }

      if (value && !/[A-Z]/.test(value)) {
        return { uppercaseLetter: true };
      }
      return null;
    };
  }

  lowcaseLetterValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value as string;

      if (value == '') {
        return { lowcaseLetter: true }
      }

      if (value && !/[a-z]/.test(value)) {
        return { lowcaseLetter: true };
      }
      return null;
    };
  }

  NumberValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value as string;

      if (value == '') {
        return { NumberLetter: true }
      }

      if (value && !/[0-9]/.test(value)) {
        return { NumberLetter: true };
      }
      return null;
    };
  }

  SpecSimvolValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value as string;

      if (value == '') {
        return { SpecSimvolLetter: true }
      }

      if (value && !/[@$!%*?&]/.test(value)) {
        return { SpecSimvolLetter: true };
      }
      return null;
    };
  }


  changePass() {
    let body = {
      first_password: this.newpassword,
      second_password: this.secondpassword
    }

    if (this.byToken) {
      this.changePassService
        .getChangePassFromLogin(body)
        .subscribe(
          (data) => (
            this.change_pass_ref.close(true)
          ),
          (error) => (
            this.change_pass_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
          )
        )
    }
    else {
      this.changePassService
        .getChangePassFromStartPage(body)
        .subscribe(
          (data) => (
            this.change_pass_msg.add({
              severity: 'success', summary: 'Успешно', detail: 'Пароль успешно изменен! Пожалуйста, войдите в систему заново!'
            }),
            this.change_pass_ref.close(true)
          ),
          (error) => (
            this.change_pass_msg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })
          )
        )
    }
  }

  closeRef() {
    this.change_pass_ref.close(false)
  }



}