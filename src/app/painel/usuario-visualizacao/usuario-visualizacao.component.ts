import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PainelService } from '../painel.service';



@Component({
  selector: 'app-usuario-visualizacao',
  templateUrl: './usuario-visualizacao.component.html',
  styleUrls: ['./usuario-visualizacao.component.css']
})
export class UsuarioVisualizacaoComponent implements OnInit {

  private idUsuario: any;
  public usuario: any;
  public estaCarregando: boolean = false;




constructor(
public painelService: PainelService,
public route: ActivatedRoute

  ) { }

  ngOnInit(){

    this.route.paramMap.subscribe((paramMap: ParamMap) =>{

      this.idUsuario = paramMap.get("idUsuario");
      this.estaCarregando = true;
      this.painelService.getUsuario(this.idUsuario).subscribe(dadosCli =>{

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




}
