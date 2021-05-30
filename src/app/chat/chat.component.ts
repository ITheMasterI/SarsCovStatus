import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketioService } from '../socketio.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  constructor(private socketioService: SocketioService) { }

  ngOnInit(): void {
    this.socketioService.setupSocketConnection();

  }







}
