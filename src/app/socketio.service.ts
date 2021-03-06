import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { io } from 'socket.io-client'



@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;

  readonly uri: string = 'ws://localhost:3000'



  constructor(){

  }

setupSocketConnection(){
  this.socket = io(this.uri);
 }


listen(eventname: string) : Observable<any> {
  return new Observable((subscriber) => {
      this.socket.on(eventname, (data) => {
          subscriber.next(data);
      })
  })
}

emit(eventname: string, data: any) {
  this.socket.emit(eventname, data);
}





}
