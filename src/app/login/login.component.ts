import { Component } from '@angular/core';
import { UsuarioService } from '../Service/usuario.service';
import { Usuario } from '../Modelo/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service : UsuarioService, private router : Router) {}

  user!: string;
  password! : string;
  usuario? : Usuario;
  formulariovalido? : boolean;

  login() {

    this.service.getUsuario(this.user).subscribe(usuario => {if (usuario.contraseña == this.password) {this.router.navigate(['inicio']);}});

  }

}
