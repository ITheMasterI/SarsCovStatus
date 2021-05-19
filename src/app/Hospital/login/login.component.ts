import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHospitalService } from '../auth-hospital.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

estaCarregando: boolean = false;


constructor(public authHospitalService: AuthHospitalService) { }

  ngOnInit(): void {
  }



  onLogin (form: NgForm){
    if(form.invalid) return;
    this.authHospitalService.login(

      form.value.id,
      form.value.nome,
      form.value.cnpj,
      form.value.endereco,
      form.value.cep,
      form.value.estado,
      form.value.telefone,
      form.value.email,
      form.value.senha


    );
    }

}
