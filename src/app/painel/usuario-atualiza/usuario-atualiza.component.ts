import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PainelService } from '../painel.service';
import { Usuario } from '../painel.model'

@Component({
  selector: 'app-usuario-atualiza',
  templateUrl: './usuario-atualiza.component.html',
  styleUrls: ['./usuario-atualiza.component.css']
})
export class UsuarioAtualizaComponent implements OnInit {
  private modo = "criar";
  private idUsuario: any;
  public usuario: any;
  public estaCarregando: boolean = false;

  constructor(
    public painelService: PainelService,
    public route: ActivatedRoute
  ) {

  }
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.idUsuario = paramMap.get("idUsuario");
      this.estaCarregando = true;
      this.painelService.getUsuario(this.idUsuario).subscribe( dadosCli => {
        this.estaCarregando = false;
        console.log(dadosCli);
        this.usuario = {

          id: dadosCli.usuario._id,
          nome: dadosCli.usuario.nome,
          cpf: dadosCli.usuario.cpf,
          email: dadosCli.usuario.email,
          status: dadosCli.usuario.status,
          relatorio: dadosCli.usuario.relatorio

        }
      });

    });
  }


onSalvarUsuario(form: NgForm){
  if(form.invalid){
    return;
  }

this.painelService.atualizarUsuario(

      this.idUsuario,
      form.value.nome,
      form.value.cpf,
      form.value.email,
      form.value.status,
      form.value.relatorio
);











}





}
