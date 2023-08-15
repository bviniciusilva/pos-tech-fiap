import mongoose from "mongoose"
import {
  BuscarUmProps,
  CriarProps,
  DeletarProps,
  EditarProps,
  IsUniqueManyProps,
  IsUniqueProps,
  Repository,
} from "@shared/ports/repository"
import { RegistroExistenteException } from "@shared/exceptions/registroExistente.exception"
import { Pedido, PedidoItemProps } from "@domain/pedido/entities/pedido"
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception"
import { PedidoModel } from "@infra/database/mongodb/pedido/models/pedido.mongo"
import { Cliente } from "@domain/cliente/entities/cliente"
import { Item } from "@domain/item/entities/item"

export class PedidoMongoRepository implements Repository<Pedido> {
  constructor(
    private readonly clienteRepository: Repository<Cliente>,
    private readonly itemRepository: Repository<Item>
  ) {}

  private async validarForeignKeys(item: Pedido) {
    const cliente = await this.clienteRepository.buscarUm({ query: { _id: item.cliente._id } })
    if (!cliente)
      throw new RegistroInexistenteException({ mensagem: `Cliente com id ${item.cliente?._id} não encontrado` })
    item.cliente = cliente
    const mapItens: PedidoItemProps[] = []
    for (let index = 0; index < item.itens.length; index++) {
      const i = item.itens[index]
      const _item = await this.itemRepository.buscarUm({ query: { _id: i.item._id } })
      if (!_item) throw new RegistroInexistenteException({ mensagem: `Item com id ${i.item._id} não encontrado` })
      mapItens.push({
        item: _item,
        qtd: i.qtd,
      })
    }
    item.itens = mapItens
    return
  }

  async listar(queryProps?: any): Promise<Pedido[]> {
    if(queryProps.deletedAt) delete queryProps.deletedAt
    return PedidoModel.find({ deletedAt: null, ...queryProps }).populate('cliente').populate({path: 'itens', populate: 'item'})
  }

  async deletar({ _id }: DeletarProps): Promise<boolean> {
    const item = await this.buscarUm({ query: { _id } })
    if (!item) throw new RegistroInexistenteException({ campo: "id" })
    item.deletedAt = new Date()
    await PedidoModel.updateOne({ _id }, item)
    return true
  }

  async criar({ item }: CriarProps<Pedido>): Promise<Pedido> {
    await this.validarForeignKeys(item)
    if (!item.valor || isNaN(item.valor)) {
      item.valor = item.calcularValor()
    }

    if (!item._id) {
      item._id = new mongoose.Types.ObjectId()
    }

    const _item = await PedidoModel.create(item)
    return this.buscarUm({ query: { _id: _item._id } })
  }

  async editar({ _id, item }: EditarProps<Pedido>): Promise<Pedido> {
    const query = {
      query: {
        _id,
      },
    }
    const _pedido = await this.buscarUm(query)
    if (!_pedido) throw new RegistroInexistenteException({ campo: "id" })
    await this.validarForeignKeys(item)
    if (!item.valor || isNaN(item.valor)) {
      item.valor = item.calcularValor()
    }

    await PedidoModel.updateOne({ _id }, item)
    return this.buscarUm(query)
  }

  async buscarUm(props: BuscarUmProps): Promise<Pedido | null> {
    if (!props.query) props.query = {}
    if (!props.query?.deletedAt) {
      props.query.deletedAt = null
    }
    return PedidoModel.findOne(props.query).populate('cliente').populate({path: 'itens', populate: 'item'})
  }

  async isUnique(props: IsUniqueManyProps): Promise<boolean> {
    let query: BuscarUmProps = {
      query: props.props.reduce((result: any, item) => {
        result[item.prop] = item.value
        return result
      }, {}),
    }
    if (props.ignoreId) query.query._id = { $ne: props.ignoreId }
    const item = await this.buscarUm(query)
    return item === null
  }
}
