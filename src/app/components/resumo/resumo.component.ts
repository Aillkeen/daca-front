import { Response } from '../../model/response';
import { Resumo } from '../../model/resumo';
import { Component, OnInit } from '@angular/core';
import { DuvidaService } from '../../services/duvida/duvida.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {

  resumo: Resumo = new Resumo();
  message : {};
  classCss : {};

  constructor(
    private duvida: DuvidaService,
  ) { }

  ngOnInit() {
    this.duvida.resumo
().subscribe((responseApi:Response) => {
        this.resumo
     = responseApi.objeto;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['erros'][0]
      });
    });
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
