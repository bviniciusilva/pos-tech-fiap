import { NotNullException } from "@shared/exceptions/notNull.exception";
import { IsNotNaturalNumberException } from "@shared/exceptions/isNotNaturalNumber.exception";
import { v4 as uuid } from "uuid";
import { DefaultClass } from "@shared/types/defaultClass";

export const tiposItem = ["bebida" , "lanche" , "opcional" , "sobremesa"]
export type TipoItem = typeof tiposItem[number];
export const medidasItem = ["porcao" , "litro" , "unidade"]
export type MedidaItem = typeof medidasItem[number];

export interface ItemProps {
  _id?: string;
  tipo: TipoItem;
  medida: MedidaItem;
  nome: string;
  descricao: string;
  aceitaOpcional: boolean;
  preco: number;
}

export class Item extends DefaultClass {
  _id?: any;
  tipo: TipoItem;
  medida: MedidaItem;
  nome: string;
  descricao: string;
  aceitaOpcional: boolean;
  preco: number;

  constructor(props: ItemProps) {
    super();
    Object.assign(this, props);
  }

  generateId() {
    if(!this._id) {
      this._id = uuid();
    }
  }
}
