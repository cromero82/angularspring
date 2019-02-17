import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError} from 'rxjs/operators'
import swal from 'sweetalert2'
import { Router } from '@angular/router';



/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError( e=>{
        if(e.status === 401 ){
          // Si el token espira, entonces cierra la sesion en angular
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }

          this.router.navigate(['/login']);
        }
        if( e.status === 403){
          swal('Acceso denegado', `Hola ${this.authService.usuario.nombre} no tienes  acceso a este recurso!`,'warning');
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    )
  }
}
