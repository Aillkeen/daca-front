import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TIRA_DUVIDA_URL } from '../tiraduvida.url';
import { Duvida } from '../../model/duvida';

@Injectable()
export class DuvidaService {

  constructor(private http: HttpClient) {}

  createOrUpdate(duvida: Duvida){
    if(duvida.id != null && duvida.id != ''){
      return this.http.put(`${TIRA_DUVIDA_URL}/rest/duvidas`,duvida);
    } else {
      duvida.id = null;
      duvida.status = 'ABERTO';
      console.log(duvida)
      return this.http.post(`${TIRA_DUVIDA_URL}/rest/duvidas`, duvida);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${TIRA_DUVIDA_URL}/rest/duvidas/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${TIRA_DUVIDA_URL}/rest/duvidas/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${TIRA_DUVIDA_URL}/rest/duvidas/${id}`);
  }

  findByParams(page:number,count:number,aceito:boolean,duvida:Duvida){
    duvida.codigo = duvida.codigo == null ? 0 : duvida.codigo;
    duvida.titulo = duvida.titulo == '' ? "uninformed" : duvida.titulo;
    duvida.status = duvida.status == '' ? "uninformed" : duvida.status;
    return this.http.get(`${TIRA_DUVIDA_URL}/rest/duvidas/${page}/${count}/${duvida.codigo}/${duvida.titulo}/${duvida.status}/${aceito}`);
  }

  changeStatus(status:string,duvida:Duvida){
    return this.http.put(`${TIRA_DUVIDA_URL}/rest/duvidas/${duvida.id}/${status}`,duvida);
  }

  resumo(){
    return this.http.get(`${TIRA_DUVIDA_URL}/rest/duvidas/resumo`);
  }

}