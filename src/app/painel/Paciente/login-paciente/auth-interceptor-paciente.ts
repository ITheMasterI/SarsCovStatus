/*import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { PainelService } from '../../painel.service';

@Injectable()
export class AuthInterceptorPaciente implements HttpInterceptor{
constructor(private painelService: PainelService){
}
intercept(req: HttpRequest<any>, next: HttpHandler){
const Usuariotoken = this.painelService.getUserToken();
const Usuariocopia = req.clone({
  headers: req.headers.set('Authorization', `Bearer ${Usuariotoken}`)
  });
  return next.handle(Usuariocopia);
}
}
*/

