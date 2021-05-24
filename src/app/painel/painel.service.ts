import { Injectable } from '@angular/core';
import { Usuario } from './painel.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable({ providedIn: 'root'})
export class PainelService {
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();


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



  //adicionando private router: Router
  constructor(private httpClient: HttpClient, private router: Router){

  }




  getUsuarios(): void {
      this.httpClient.get <{mensagem: string, usuarios: any}>('http://localhost:3000/api/usuarios')
        .pipe(map((dados) => {
          return dados.usuarios.map((usuario:any) => {
            return {
              id: usuario._id,
              nome: usuario.nome,
              cpf: usuario.cpf,
              email: usuario.email,
              status: usuario.status,
              relatorio: usuario.relatorio,
            }
          })
        }))
        .subscribe(
          (usuarios) => {
            this.usuarios = usuarios;
            this.listaUsuariosAtualizada.next([...this.usuarios]);
          }
        )
  }

  getListaDeUsuariosAtualizadaObservable(){
    return this.listaUsuariosAtualizada.asObservable();
  }

  adicionarUsuario(id: string, nome:string, cpf:string, email:string, status: string, relatorio:string){
    const usuario: Usuario = {
      _id: id,
      nome: nome,
      cpf: cpf,
      email: email,
      status: status,
      relatorio: relatorio,
    };
    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/usuarios',
      usuario).subscribe(
        (dados) => {
          usuario._id = dados.id;
          this.usuarios.push(usuario);
          this.listaUsuariosAtualizada.next([...this.usuarios]);
           this.router.navigate(['/painel-controle']);
        }
      )
  }

  removerUsuario (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/usuarios/${id}`).subscribe(() => {
      this.usuarios = this.usuarios.filter((cli) =>{

        return cli._id !== id
      });
    this.listaUsuariosAtualizada.next([...this.usuarios]);
    });
    }


getUsuario (idUsuario: any){

  return this.httpClient.get<{usuario: Usuario}>
  (`http://localhost:3000/api/usuarios/${idUsuario}`);
}

atualizarUsuario (id: string, nome: string, cpf: string, email: string, status: string, relatorio: string){
  const usuario: Usuario = {_id:id, nome, cpf, email, status, relatorio};
  console.log('********** Vai atualizar ... ************');
  this.httpClient.put(`http://localhost:3000/api/usuarios/${id}`, usuario).
  subscribe((res => {
    const copia = [...this.usuarios];
    const indice = copia.findIndex (cli => cli._id === usuario._id);
    copia[indice] = usuario;
    this.usuarios = copia;
    this.listaUsuariosAtualizada.next([...this.usuarios]);
    this.router.navigate(['/painel-controle']);
  }));
}





login (id: string, nome: string, cpf: string, email: string, status: string, relatorio: string){
  const usuario: Usuario = {

    _id: id,
    nome: nome,
    cpf: cpf,
    email: email,
    status: status,
    relatorio: relatorio

  }
  this.httpClient.post<{token: string}>("http://localhost:3000/api/usuarios/login", usuario).subscribe(resposta => {
  this.token = resposta.token;
  if(this.token){
    this.autenticado = true;
    this.authStatusSubject.next(true);
  }

  this.router.navigate(["/profile", usuario._id]);
  });
  }


  logout(){
    this.token = null;
    this.authStatusSubject.next(false);
    this.router.navigate(['/'])
  }






}
