import { Component } from '@angular/core';
import { Usuario } from "./painel/painel.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'SarsCovStatus';
  usuarios: Usuario[] = [];


onUsuarioAdicionado(usuario: Usuario){
  this.usuarios = [...this.usuarios, usuario];
  console.log(this.usuarios);
}

}


