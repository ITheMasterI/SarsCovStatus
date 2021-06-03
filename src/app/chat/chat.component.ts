import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SocketioService } from '../socketio.service';
import * as io from "socket.io-client";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

constructor(private socketioService: SocketioService){}


ngOnInit():void {
  this.socketioService.listen("teste").subscribe((data) => {
    console.log(data);
  })

}



}



