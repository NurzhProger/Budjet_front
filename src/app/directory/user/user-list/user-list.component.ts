import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MainComponent } from 'src/app/main/main.component';
import { user_detail, user_list } from '../interfaces';
import { Observable } from 'rxjs';
import { UsersService } from '../user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  first = 0
  rows = 25

  constructor(
    private MainComponent: MainComponent,
    private userService: UsersService,
    private userListref: DynamicDialogRef,
    private userListmessageService: MessageService,
    private userListdialogservice: DialogService
  ) {
    this.first = this.MainComponent.first
    this.rows = this.MainComponent.rows
  }

  @Output() closeEvent = new EventEmitter<any>()
  @Input() list = false

  users$: Observable<user_list>
  searchUser = ''
  selected: any
  windowHeight: number

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWindowSize(),
      this.updateWindowSize()
  }

  private updateWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.fetch(),
      this.updateWindowSize()
  }

  fetch() {

    let params = {
      limit: this.rows.toString(),
      offset: this.first.toString(),
      search: this.searchUser
    }

    this.users$ = this.userService.fetch(params)

  }

  openNew() {

  }

  onSelected(user: user_detail) {
    if (!this.selected) {
      this.userListmessageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите пользователя!' })
      return
    }
    this.userListref.close(user)
  }

  onRowClick(user: user_detail) {
    if (this.list) {
      this.onRowEdit(user)
    }
    else {
      this.userListref.close(user)
    }
  }

  onRowEdit(user: user_detail) {
    this.userListref = this.userListdialogservice.open(UserDetailComponent,
      {
        header: 'Редактирование пользователя',
        width: '60%',
        height: '60%',
        data: { user_id: user.id }
      })

    this.userListref.onClose.subscribe((save: boolean) => {

      if (save) {
        this.fetch()
      }
    })
  }

  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    this.fetch()
  }

  closeform() {
    this.closeEvent.emit()
  }

}
