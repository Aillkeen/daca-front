import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../model/usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public shared: SharedService;

  constructor(private usuarioService: UsuarioService,
              private router: Router){
      this.shared = SharedService.getInstance();
      this.shared.user = new Usuario('','','','');
  }

  ngOnInit(){
  }

  signOut() : void {
    this.shared.token = null;
    this.shared.user = null;
    window.location.href = '/';
    window.location.reload();
  }
}
