import { Response } from '../../model/response';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { SharedService } from '../../services/shared.service';
import { Usuario } from '../../model/usuario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.css']
})
export class UsuarioNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  user = new Usuario('','','','');
  shared : SharedService;
  message : {};
  classCss : {};
  
  constructor(
    private userService: UsuarioService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.userService.findById(id).subscribe((response:Response) => {
      this.user = response.objeto;
      this.user.password = '';
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['erros'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((response:Response) => {
        this.user = new Usuario(null,'','','');
        let userRet : Usuario = response.objeto;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Uusário salvo com sucesso!`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['erros'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] =  true;
  }

}