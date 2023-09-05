import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserService} from './user.service';
import {User} from './interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(
  private UserService: UserService,
  private User_Detailmsg: MessageService,
  private User_Detailref: DynamicDialogRef,
  public User_conf: DynamicDialogConfig) { }


  oldpassword: string = '';
  newpassword: string = '';
  changepass: boolean = false;

  form: FormGroup
  userdatail: User
  ngOnInit(): void {
    this.form = new FormGroup({
      oldpassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
      newpassword: new FormControl("",  [Validators.required, Validators.minLength(8)])
    })


  }



savePassword() {

}

close(){

}



}
