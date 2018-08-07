import { Duvida } from '../../model/duvida';
import { Response } from '../../model/response';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { DuvidaService } from '../../services/duvida/duvida.service';


@Component({
  selector: 'app-duvida-list',
  templateUrl: './duvida-list.component.html',
  styleUrls: ['./duvida-list.component.css']
})
export class DuvidaListComponent implements OnInit {

  aceito: boolean = false;
  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listDuvida=[];
  duvidaFilter = new Duvida('',0,'','','',null,null,'',null);

  constructor(
    private dialogService: DialogService,
    private duvidaService: DuvidaService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.duvidaService.findAll(page,count).subscribe((response:Response) => {
        console.log(response)
        this.listDuvida = response['objeto']['content'];
        this.pages = new Array(response['objeto']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['erros'][0]
      });
    });
  }

  filter(): void {
    this.page = 0;
    this.count = 5;
    this.duvidaService.findByParams(this.page,this.count,this.aceito,this.duvidaFilter)
    .subscribe((response:Response) => {
      this.duvidaFilter.titulo = this.duvidaFilter.titulo == 'uninformed' ? "" : this.duvidaFilter.titulo;
      this.duvidaFilter.codigo = this.duvidaFilter.codigo == 0 ? null : this.duvidaFilter.codigo;  
      this.listDuvida = response['objeto']['content'];
        this.pages = new Array(response['objeto']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['erros'][0]
      });
    });
  }

  cleanFilter(): void {
    this.aceito = false;
    this.page = 0;
    this.count = 5;
    this.duvidaFilter = new Duvida('',0,'','','',null,null,'',null);
    this.findAll(this.page,this.count);
  }


  edit(id:string){
    this.router.navigate(['/duvida-new',id]);
  }

  detail(id:string){
    this.router.navigate(['/duvida-detail',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Deseja deletar a dúvida ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.duvidaService.delete(id).subscribe((response:Response) => {
                this.showMessage({
                  type: 'success',
                  text: `Dúvida deletada`
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
