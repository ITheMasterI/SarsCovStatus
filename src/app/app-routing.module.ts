import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { CadastroComponent } from './Hospital/cadastro/cadastro.component';
import { LoginComponent } from './Hospital/login/login.component';

import { LoginPacienteComponent } from './painel/Paciente/login-paciente/login-paciente.component';


import { CadastroUsuarioComponent } from './painel/usuario-inserir/cadastro-usuario.component';
import { PainelControleComponent } from './painel/painel-controle/painel-controle.component';
import {UsuarioAtualizaComponent} from './painel/usuario-atualiza/usuario-atualiza.component';
import { UsuarioVisualizacaoComponent } from './painel/usuario-visualizacao/usuario-visualizacao.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [

  { path: "chat/:nomeUsuario", component: ChatComponent},
  { path: "chat/:nomeHospital", component: ChatComponent},
  { path: "profile/:idUsuario", component: UsuarioVisualizacaoComponent},
  { path: "editar/:idUsuario", component: UsuarioAtualizaComponent},
  { path: "cadastro-paciente", component: CadastroUsuarioComponent},
  { path: "painel-controle", component: PainelControleComponent},
  { path: "login-paciente", component: LoginPacienteComponent},
  { path: "cadastro", component: CadastroComponent},
  { path: "login", component: LoginComponent},
  { path: "", component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
