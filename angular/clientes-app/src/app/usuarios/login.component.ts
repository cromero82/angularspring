import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo:string = 'Por favor Sign In!';
  usuario: Usuario;
  constructor(private authService:AuthService, private router:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }


  login(): void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal('Error login', 'Username o password vacias!','error')
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response.toString());
      // contenido del payload (del token) atob (decodificador) convertido a JSON
      let payload = JSON.parse( atob( response.access_token.split(".")[1]));
      console.log(payload);
      this.router.navigate(['/clientes']);
      swal('Login',`Hola ${payload.user_name}, has iniciado sesión con éxito!`,'success');
    })
  }

}
