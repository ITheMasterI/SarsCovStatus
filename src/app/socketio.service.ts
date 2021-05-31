import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { io } from 'socket.io-client'
import { Observable } from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;


  constructor(){

  }

setupSocketConnection(){
  this.socket = io(environment.SOCKET_ENDPOINT);
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


