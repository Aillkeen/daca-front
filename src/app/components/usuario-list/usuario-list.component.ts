import { Response } from '../../model/response';
import { Usuario } from '../../model/usuario';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listUser=[];

  constructor(
    private dialogService: DialogService,
    private userService: UsuarioService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.userService.findAll(page,count).subscribe((response:Response) => {
        this.listUser = response['objeto']['content'];
        this.pages = new Array(response['objeto']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['erros'][0]
      });
    });

  }

  edit(id:string){
    this.router.navigate(['/usuario-new',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Do you want to delete the email ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.userService.delete(id).subscribe((response:Response) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findAll(this.page,this.count);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['erros'][0]
              });
            });
          }
      });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
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