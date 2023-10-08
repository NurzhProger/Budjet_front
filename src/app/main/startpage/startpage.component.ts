import { Component, EventEmitter, Output, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { UserhistoryDetailComponent } from "../userhistory-detail/userhistory-detail.component";

@Component({
  selector: 'startpage-element',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class StartPageComponent {
  constructor(
    public StartmessageService: MessageService,
    private Startdialog_form: DialogService,
    private start_ref: DynamicDialogRef) { }


  @Output() newItemEvent = new EventEmitter<any>();

  ngOnInit() {

  }

}
