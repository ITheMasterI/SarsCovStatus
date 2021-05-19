import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHospitalService } from '../auth-hospital.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent{

  estaCarregando: boolean = false;
  constructor(public authHospitalService: AuthHospitalService) {}

  onAdicionarHospital(form: NgForm){

    if(form.invalid){
      return;
    }
    this.authHospitalService.adicionarHospital(

      form.value.id,
      form.value.nome,
      form.value.cnpj,
      form.value.email,
      form.value.cep,
      form.value.endereco,
      form.value.estado,
      form.value.telefone,
      form.value.senha


    );
    form.resetForm();

}


}
