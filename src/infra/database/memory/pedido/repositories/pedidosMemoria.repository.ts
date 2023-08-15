import { BuscarUmProps, CriarProps, DeletarProps, EditarProps, Repository } from "@shared/ports/repository"
import { Cliente } from "@domain/cliente/entities/cliente"
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception"
import { Pedido } from "src/domain/pedido/entities/pedido"
import { DtoValidationException } from "src/shared/exceptions/dtoValidationError.exception"

export class PedidoMemoriaRepository implements Repository<Pedido> {
  private static instance: PedidoMemoriaRepository
  private static pedidos: Pedido[] = []

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }

  async listar(): Promise<Pedido[]> {
    return PedidoMemoriaRepository.pedidos.filter((i) => !i.deletedAt)
  }

  async deletar({ _id }: DeletarProps): Promise<boolean> {
    const item = await this.buscarUm({ query: { _id } })
    if (!item) throw new RegistroInexistenteException({ campo: "id" })
    item.deletedAt = new Date()
    return true
  }

  async criar({ item }: CriarProps<Pedido>): Promise<Pedido> {
    if(!item.cliente || !item.itens || item.itens.length == 0) throw new DtoValidationException(['O pedido deve conter um cliente e no mínimo um item']);
    if(!item._id) item.generateId();
    PedidoMemoriaRepository.pedidos.push(item)
    return item
  }

  async editar({ _id, item }: EditarProps<Pedido>): Promise<Pedido> {
    const itemIndex = PedidoMemoriaRepository.pedidos.findIndex((_item) => _item._id == item._id)
    if (itemIndex < 0) throw new RegistroInexistenteException({})
    let cliente = PedidoMemoriaRepository.pedidos[itemIndex]
    Object.entries(item).forEach(([key, value]) => {
      cliente[key] = value
    })
    return PedidoMemoriaRepository.pedidos[itemIndex]
  }

  async buscarUm(props: BuscarUmProps): Promise<Pedido | null> {
    return (
      PedidoMemoriaRepository.pedidos.find((_item) => {
        let hasValue = true
        Object.entries(props.query).forEach(([key, value]) => {
          // @ts-ignore
          if (_item[key] !== undefined && _item[key] != value) hasValue = false
        })
        return hasValue
      }) ?? null
    )
  }
}
