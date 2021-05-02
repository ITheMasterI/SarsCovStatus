import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { CadastroComponent } from './Hospital/cadastro/cadastro.component';
import { LoginComponent } from './Hospital/login/login.component';

import { LoginPacienteComponent } from './Paciente/login-paciente/login-paciente.component';


import { CadastroUsuarioComponent } from './painel/usuario-inserir/cadastro-usuario.component';
import { PainelControleComponent } from './painel/painel-controle/painel-controle.component';
import {UsuarioAtualizaComponent} from './painel/usuario-atualiza/usuario-atualiza.component';

const routes: Routes = [

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
