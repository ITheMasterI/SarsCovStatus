
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { PainelService } from './painel.service'


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
constructor(private painelService: PainelService){
}
intercept(req: HttpRequest<any>, next: HttpHandler){
const token = this.painelService.getToken();
const copia = req.clone({
headers: req.headers.set('Authorization', `Bearer ${token}`)
})
return next.handle(copia);
}
}
