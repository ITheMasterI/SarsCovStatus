import { Injectable } from '@angular/core';
import { Usuario } from './painel.model';
import { from, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root'})
export class PainelService {
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();


  private tokenAuth: string;
  private authStatusSubject = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private idPaciente: string;





  public getToken(): string{
    return this.tokenAuth;
  }

  public getStatusSubject(){
    return this.authStatusSubject.asObservable();
  }



private autenticadoUser: boolean = false;

public isAutenticado(): boolean{
  return this.autenticadoUser;
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
  this.httpClient.post<{tokenAuth: string, expiresIn: number}>("http://localhost:3000/api/usuarios/login", usuario).subscribe(resposta => {
    this.tokenAuth = resposta.tokenAuth;
    if(this.tokenAuth){
      const tempoValidadeToken = resposta.expiresIn;
      this.tokenTimer = setTimeout(() => {
        this.logout()
      }, tempoValidadeToken * 1000);
      this.autenticadoUser = true;
      this.authStatusSubject.next(true);
      this.salvarDadosDeAutenticacao(this.tokenAuth, new Date(new Date().getTime() + tempoValidadeToken * 1000)
            , this.idPaciente);

    }

    this.router.navigate(["/profile", usuario._id]);
    });
    }


    private salvarDadosDeAutenticacao (tokenAuth: string, validade: Date, idPaciente: string){
      localStorage.setItem ('tokenAuth', tokenAuth);
      localStorage.setItem ('validade', validade.toISOString());
      localStorage.setItem ('idPaciente', idPaciente);
    }

    private removerDadosDeAutenticacao (){
      localStorage.removeItem ('tokenAuth');
      localStorage.removeItem ('validade');
      localStorage.removeItem ('idPaciente');
    }

    public autenticarAutomaticamente (): void{
      const dadosAutenticacao = this.obterDadosDeAutenticacao();
      if (dadosAutenticacao){
        const agora = new Date();
        const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
        if (diferenca > 0){
          this.tokenAuth = dadosAutenticacao.tokenAuth;
          this.autenticadoUser = true;
          this.idPaciente = dadosAutenticacao.idPaciente;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, diferenca);
          this.authStatusSubject.next(true);
        }
      }
    }

    private obterDadosDeAutenticacao(){
      const tokenAuth = localStorage.getItem ('tokenAuth');
      const validade = localStorage.getItem ('validade');
      const idPaciente = localStorage.getItem ('idPaciente');
      if (tokenAuth && validade) {
        return {tokenAuth: tokenAuth, validade: new Date(validade), idPaciente: idPaciente}
      }
      return null;
    }



logout(){
  this.tokenAuth = null;
  this.authStatusSubject.next(false);
  this.autenticadoUser = false;
  clearTimeout(this.tokenTimer);
  this.idPaciente = null;
  this.removerDadosDeAutenticacao()
  this.router.navigate(['/'])
}







}
