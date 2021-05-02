import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PainelService } from '../painel.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent{



constructor(public painelService: PainelService) {}


onAdicionarUsuario(form: NgForm){

    if(form.invalid){
      return;
    }
    this.painelService.adicionarUsuario(

      form.value.id,
      form.value.nome,
      form.value.cpf,
      form.value.email,
      form.value.status,
      form.value.relatorio

    );
    form.resetForm();

}






}
