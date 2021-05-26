import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Usuario } from '../painel.model';
import { PainelService } from '../painel.service';
import { AuthHospitalService } from '../../Hospital/auth-hospital.service';


@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit, OnDestroy {

  usuarios:Usuario[] = [];
  private usuariosSubscription!: Subscription;

public estaCarregando: boolean = false;

private authObserve: Subscription;
public autenticado: boolean = false;

constructor(private painelService: PainelService, private authHospitalService: AuthHospitalService) { }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
    this.authObserve.unsubscribe();
  }

  ngOnInit(): void {

this.estaCarregando = true;



    this.painelService.getUsuarios();
    this.usuariosSubscription = this.painelService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((usuarios: Usuario[]) => {


        this.estaCarregando = false;


        this.usuarios = usuarios;
      });

      this.autenticado = this.authHospitalService.isAutenticado();
      this.authObserve = this.authHospitalService.getStatusSubject().subscribe((autenticado) =>{
      this.autenticado = autenticado;
      })
  }

  onDelete (id: string): void{
    this.painelService.removerUsuario(id);
    }

    onLogout(){
      this.authHospitalService.logout();
    }

}

