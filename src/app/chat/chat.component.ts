import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SocketioService } from '../socketio.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent //implements OnInit
{


  userName: string;
  message: string;
  output: any[] = [];
  feedback: string;



  constructor(private socketioService: SocketioService) { }



  ngOnInit():void {
    this.socketioService.setupSocketConnection();
    this.socketioService.listen('chat').subscribe((data) => this.updateMessage(data));


  }

  messageTyping(): void {
    this.socketioService.emit('typing', this.userName);
  }

  sendMessage(): void {
    this.socketioService.emit('chat', {
      message: this.message,

    });
    this.message = "";

  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.message}`);
    this.output.push(data);
  }









}
