import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {PainelService} from '../../painel.service'


@Component({
  selector: 'app-login-paciente',
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.css']
})
export class LoginPacienteComponent implements OnInit {

  estaCarregando: boolean = false;


  constructor(public painelService: PainelService) { }


  ngOnInit(): void {
  }


onLoginPaciente(form: NgForm){

if(form.invalid) return;

this.painelService.loginPaciente(


form.value.id,
form.value.nome,
form.value.cpf,
form.value.email,
form.value.status,
form.value.relatorio


)
}





}
