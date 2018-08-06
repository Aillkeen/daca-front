import { Usuario } from './usuario';

export class Duvida {
    constructor(
        public id: string,
        public codigo: number,
        public titulo: string,
        public descricao: string,
        public status: string,
        public usuario: Usuario,
        public tutor: Usuario,
        public data: string,
        public historicos: Array<string>
    ) {}

    public equals(obj: Duvida
    
) : boolean { 
        return this.codigo === obj.codigo;
    } 

  }
  