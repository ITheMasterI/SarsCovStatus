import { Injectable } from '@angular/core';
import { Hospital } from './auth-hospital.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthHospitalService {

  private hospitais: Hospital[] = [];
  private listaHospitaisAtualizada = new Subject<Hospital[]>();


private token: string;
private tokenTimer: NodeJS.Timer;
private authStatusSubject = new Subject<boolean>();
private idHospital: string;

public getToken(): string{
  return this.token;
}

public getStatusSubject(){
  return this.authStatusSubject.asObservable();
}

private autenticado: boolean = false;

public isAutenticado(): boolean{
  return this.autenticado;
}



  constructor(private httpClient: HttpClient, private router: Router){

  }

  getHospitais(): void {
    this.httpClient.get <{mensagem: string, hospitais: any}>('http://localhost:3000/api/hospitais')
      .pipe(map((dados) => {
        return dados.hospitais.map((hospital:any) => {
          return {
            id: hospital._id,
            nome: hospital.nome,
            cnpj: hospital.cnpj,
            email: hospital.email,
            cep: hospital.cep,
            endereco: hospital.endereco,
            estado: hospital.estado,
             telefone: hospital.telefone,
              senha: hospital.senha
          }
        })
      }))
      .subscribe(
        (hospitais) => {
          this.hospitais = hospitais;
          this.listaHospitaisAtualizada.next([...this.hospitais]);
        }
      )
}

getListaDeHospitaisAtualizadaObservable(){
  return this.listaHospitaisAtualizada.asObservable();
}

  adicionarHospital(id: string, nome: string, cnpj: string, email: string, cep: string, endereco: string, estado: string, telefone: string, senha: string){
    const hospital: Hospital = {
      _id: id,
      nome: nome,
      cnpj: cnpj,
      email: email,
      cep: cep,
      endereco: endereco,
      estado: estado,
      telefone: telefone,
      senha: senha
    };
    this.httpClient.post('http://localhost:3000/api/hospitais/cadastro',
    hospital).subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(["/login"]);
      });
      }



  login (id: string, nome: string, cnpj: string, cep: string, endereco: string, estado: string, telefone: string, email: string, senha: string){
    const hospital: Hospital = {
      _id: id,
      nome: nome,
      cnpj: cnpj,
    endereco: endereco,
    estado: estado,
    telefone: telefone,
    cep: cep,
    email: email,
    senha: senha
    }
    this.httpClient.post<{token: string, expiresIn: number}>("http://localhost:3000/api/hospitais/login", hospital).subscribe(resposta => {
    this.token = resposta.token;
    if(this.token){
      const tempoValidadeToken = resposta.expiresIn;
      this.tokenTimer = setTimeout(() => {
        this.logout()
      }, tempoValidadeToken * 1000);
      this.autenticado = true;
      this.authStatusSubject.next(true);
      this.salvarDadosDeAutenticacao(this.token, new Date(new Date().getTime() + tempoValidadeToken * 1000)
            , this.idHospital);

    }

    this.router.navigate(["/painel-controle"]);
    });
    }


    private salvarDadosDeAutenticacao (token: string, validade: Date, idHospital: string){
      localStorage.setItem ('token', token);
      localStorage.setItem ('validade', validade.toISOString());
      localStorage.setItem ('idHospital', idHospital);
    }

    private removerDadosDeAutenticacao (){
      localStorage.removeItem ('token');
      localStorage.removeItem ('validade');
      localStorage.removeItem ('idHospital');
    }

    public autenticarAutomaticamente (): void{
      const dadosAutenticacao = this.obterDadosDeAutenticacao();
      if (dadosAutenticacao){
        const agora = new Date();
        const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
        if (diferenca > 0){
          this.token = dadosAutenticacao.token;
          this.autenticado = true;
          this.idHospital = dadosAutenticacao.idHospital;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, diferenca);
          this.authStatusSubject.next(true);
        }
      }
    }

    private obterDadosDeAutenticacao(){
      const token = localStorage.getItem ('token');
      const validade = localStorage.getItem ('validade');
      const idHospital = localStorage.getItem ('idHospital');
      if (token && validade) {
        return {token: token, validade: new Date(validade), idHospital: idHospital}
      }
      return null;
    }



logout(){
  this.token = null;
  this.authStatusSubject.next(false);
  this.autenticado = false;
  clearTimeout(this.tokenTimer);
  this.idHospital = null;
  this.removerDadosDeAutenticacao()
  this.router.navigate(['/'])
}






}
