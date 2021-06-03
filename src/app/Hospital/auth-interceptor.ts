import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { AuthHospitalService } from './auth-hospital.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
constructor(private authHospitalService: AuthHospitalService){
}
intercept(req: HttpRequest<any>, next: HttpHandler){
const token = this.authHospitalService.getToken();
const copia = req.clone({
headers: req.headers.set('Authorization', `Bearer ${token}`)
})
return next.handle(copia);
}
}
