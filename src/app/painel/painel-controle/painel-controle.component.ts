import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../painel.model';
import { PainelService } from '../painel.service';


@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit, OnDestroy {

  usuarios:Usuario[] = [];
  private usuariosSubscription!: Subscription;

//--------
public estaCarregando: boolean = false;
//--------

  constructor(public painelService: PainelService) { }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }

  ngOnInit(): void {

 //----------
this.estaCarregando = true;
//-------


    this.painelService.getUsuarios();
    this.usuariosSubscription = this.painelService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((usuarios: Usuario[]) => {


        //------
        this.estaCarregando = false;
        //----


        this.usuarios = usuarios;
      });
  }

  onDelete (id: string): void{
    this.painelService.removerUsuario(id);
    }

}

