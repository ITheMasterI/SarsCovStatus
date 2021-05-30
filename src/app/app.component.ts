import { Component, OnInit } from '@angular/core';
import { Usuario } from "./painel/painel.model"
import { Hospital } from './Hospital/auth-hospital.model'
import { AuthHospitalService } from './Hospital/auth-hospital.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'SarsCovStatus';
  usuarios: Usuario[] = [];
  hospitais: Hospital[] = [];

  constructor(private authHospitalService: AuthHospitalService){
  }

  ngOnInit(){
  this.authHospitalService.autenticarAutomaticamente();
  }


onUsuarioAdicionado(usuario: Usuario){
  this.usuarios = [...this.usuarios, usuario];
  console.log(this.usuarios);
}


onHospitalAdicionado(hospital: Hospital){
  this.hospitais = [...this.hospitais, hospital];
  console.log(this.hospitais);
}















}


