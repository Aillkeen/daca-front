import { Usuario } from '../../model/usuario';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TIRA_DUVIDA_URL } from '../tiraduvida.url';

@Injectable()
export class UsuarioService {
  
  constructor(private http: HttpClient) {}

  login(usuario: Usuario){
    return this.http.post(`${TIRA_DUVIDA_URL}/rest/auth`,usuario);
  }

  createOrUpdate(usuario: Usuario){
    if(usuario.id != null && usuario.id != ''){
      return this.http.put(`${TIRA_DUVIDA_URL}/rest/usuarios`,usuario);
    } else {
      usuario.id = null;
      return this.http.post(`${TIRA_DUVIDA_URL}/rest/usuarios`, usuario);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${TIRA_DUVIDA_URL}/rest/usuarios/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${TIRA_DUVIDA_URL}/rest/usuarios/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${TIRA_DUVIDA_URL}/rest/usuarios/${id}`);
  }
}
