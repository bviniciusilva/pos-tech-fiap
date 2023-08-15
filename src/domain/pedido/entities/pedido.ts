import { ClienteProps } from "src/domain/cliente/entities/cliente"
import { ItemProps } from "src/domain/item/entities/item"
import { DefaultClass } from "src/shared/types/defaultClass"
import { v4 as uuid } from "uuid"

export const statusPedidos = ["aberto", "cancelado", "aguardandoPagamento", "pago", "emPreparacao", "entregue"]
export type StatusPedido = (typeof statusPedidos)[number]

export interface PedidoItemProps {
  item: ItemProps
  qtd: number
}

export interface PedidoProps {
  _id?: any
  cliente: ClienteProps
  itens: PedidoItemProps[]
  status: StatusPedido
  valor?: number
}

export class Pedido extends DefaultClass implements PedidoProps {
  _id?: any
  cliente: ClienteProps
  itens: PedidoItemProps[]
  status: string
  valor?: number;

  constructor(props: PedidoProps) {
    super()
    Object.assign(this, props)
    this.valor = this.calcularValor();
  }

  generateId() {
    if (!this._id) {
      this._id = uuid()
    }
  }

  calcularValor() {
    return this.itens.reduce((result, i) => {
        result += i.item.preco * i.qtd
        return result
      }, 0)
  }
}
