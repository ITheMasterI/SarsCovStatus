import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from
"@angular/router";
import { Observable } from "rxjs";
import { AuthHospitalService } from "./auth-hospital.service";




@Injectable()
export class AuthGuard implements CanActivate{
constructor(
private authHospitalService: AuthHospitalService,
private router: Router
){
}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
const isAutenticado = this.authHospitalService.isAutenticado();
if (!isAutenticado){
this.router.navigate(['/']);
}
return isAutenticado;
}
}


