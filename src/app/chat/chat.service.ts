import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthHospitalService } from '../Hospital/auth-hospital.service';
import { PainelService } from '../painel/painel.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ChatService {


  socket;
  constructor(private httpClient: HttpClient, private router: Router) {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token: "abc"
      }
    });

    this.socket.emit('my message', 'Hello there from Angular.');

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }
}
