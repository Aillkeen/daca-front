import { UsuarioLogado } from '../../../model/usuarioLogado';
import { SharedService } from '../../../services/shared.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario('','','','');
  shared : SharedService;
  message : string;
  showSpinner: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private router: Router) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }
  

  login(){
    this.message = '';
    this.showSpinner = true;
    this.usuarioService.login(this.usuario).subscribe((userAuthentication:UsuarioLogado) => {
        
        this.shared.token = userAuthentication.token;
        this.shared.user = userAuthentication.user;
        console.log(this.shared.user.papel);
        this.shared.user.papel = this.shared.user.papel.substring(5);
        console.log(this.shared.user.papel);
        this.shared.showTemplate.emit(true);
        this.showSpinner = false;
        this.router.navigate(['/']);
       
    } , err => {
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.showSpinner = false;
      this.message = 'Erro ';
    });
  }

  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario('', '','','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
