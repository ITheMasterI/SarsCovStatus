import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PainelService } from '../painel.service';
import { AuthHospitalService } from '../../Hospital/auth-hospital.service'
import { Hospital } from '../../Hospital/auth-hospital.model'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-usuario-visualizacao',
  templateUrl: './usuario-visualizacao.component.html',
  styleUrls: ['./usuario-visualizacao.component.css']
})
export class UsuarioVisualizacaoComponent implements OnInit, OnDestroy {

  private idUsuario: any;
  public usuario: any;
  public estaCarregando: boolean = false;



public hospital: any;

hospitais:Hospital[] = [];
private hospitaisSubscription!: Subscription;


private authObserverUser: Subscription;
public autenticado: boolean = false;


constructor(
private painelService: PainelService,
private authHospitalService: AuthHospitalService,
public route: ActivatedRoute

  ) { }


  ngOnDestroy(): void {
    this.hospitaisSubscription.unsubscribe();
    this.authObserverUser.unsubscribe();
  }




  ngOnInit():void{

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



this.authHospitalService.getHospitais();
    this.hospitaisSubscription = this.authHospitalService
      .getListaDeHospitaisAtualizadaObservable()
      .subscribe((hospitais: Hospital[]) => {


        this.estaCarregando = false;


        this.hospitais = hospitais;
      });

    this.autenticado = this.painelService.isAutenticado();

    this.authObserverUser =
    this.painelService.getStatusSubject().
    subscribe((autenticado) => {
    this.autenticado = autenticado;
    })


  }

  onLogout(){
    this.painelService.logout();
  }
}
