import { Response } from '../../model/response';
import { ActivatedRoute } from '@angular/router';
import { Duvida } from '../../model/duvida';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { DuvidaService } from '../../services/duvida/duvida.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-duvida-new',
  templateUrl: './duvida-new.component.html',
  styleUrls: ['./duvida-new.component.css']
})
export class DuvidaNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  duvida = new Duvida('',0,'','','',null,null,'',null);
  shared : SharedService;
  message : {};
  classCss : {};

  constructor(
    private duvidaService: DuvidaService,
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
    this.duvidaService.findById(id).subscribe((responseApi:Response) => {
      this.duvida = responseApi.objeto;
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['erros'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.duvidaService.createOrUpdate(this.duvida).subscribe((responseApi:Response) => {
        this.duvida = new Duvida('',0,'','','',null,null,'',null);
        let duvida : Duvida = responseApi.objeto;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Dúvida salva com sucesso!`
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
