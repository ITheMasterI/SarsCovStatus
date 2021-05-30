import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './Hospital/cadastro/cadastro.component';
import { LoginComponent } from './Hospital/login/login.component';
import { LoginPacienteComponent } from './painel/Paciente/login-paciente/login-paciente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PainelControleComponent } from './painel/painel-controle/painel-controle.component';
import { CadastroUsuarioComponent } from './painel/usuario-inserir/cadastro-usuario.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PainelService } from "./painel/painel.service";
import { UsuarioAtualizaComponent } from './painel/usuario-atualiza/usuario-atualiza.component';

import { MatProgressSpinnerModule} from
'@angular/material/progress-spinner';


import { UsuarioVisualizacaoComponent } from './painel/usuario-visualizacao/usuario-visualizacao.component';
import { ChatComponent } from './chat/chat.component';

import { AuthHospitalService } from './Hospital/auth-hospital.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AuthInterceptor} from './Hospital/auth-interceptor'
import { SocketioService } from './socketio.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroComponent,
    LoginComponent,
    LoginPacienteComponent,
    PainelControleComponent,
    CadastroUsuarioComponent,
    UsuarioAtualizaComponent,
    UsuarioVisualizacaoComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
