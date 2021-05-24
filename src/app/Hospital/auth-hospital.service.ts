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
private authStatusSubject = new Subject<boolean>();

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
    this.httpClient.post<{token: string}>("http://localhost:3000/api/hospitais/login", hospital).subscribe(resposta => {
    this.token = resposta.token;
    if(this.token){
      this.autenticado = true;
      this.authStatusSubject.next(true);

    }

    this.router.navigate(["/painel-controle"]);
    });
    }



logout(){
  this.token = null;
  this.authStatusSubject.next(false);
  this.router.navigate(['/'])
}






}
