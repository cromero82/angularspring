import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
// token, refreshToken, datos adicionales de usuario
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario:Usuario): Observable<any>{
    const urlEndPoint = 'http://localhost:8081/oauth/token';
    // btoa: convierte a base 64
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +  credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    console.log( params.toString());
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders})
  }
}
