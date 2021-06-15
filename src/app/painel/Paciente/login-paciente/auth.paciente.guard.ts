/*import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from
"@angular/router";
import { Observable } from "rxjs";
import { PainelService } from "../../painel.service";



@Injectable()
export class AuthPacienteGuard implements CanActivate{
constructor(
private painelService: PainelService,
private router: Router
){
}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
const isUsuarioAutenticado = this.painelService.isUserAutenticado();
if (!isUsuarioAutenticado){
this.router.navigate(['/']);
}
return isUsuarioAutenticado;
}
}
*/



