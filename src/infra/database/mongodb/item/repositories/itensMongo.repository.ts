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
import { Item } from "@domain/item/entities/item"
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception"
import { ItemModel } from "@infra/database/mongodb/item/models/item.mongo"
import mongoose from "mongoose"

export class ItemMongoRepository implements Repository<Item> {
  constructor() {}

  async listar(queryProps?: any): Promise<Item[]> {
    if(queryProps.deletedAt) delete queryProps.deletedAt
    return ItemModel.find({ deletedAt: null, ...queryProps })
  }

  async deletar({ _id }: DeletarProps): Promise<boolean> {
    const item = await this.buscarUm({ query: { _id } })
    if (!item) throw new RegistroInexistenteException({ campo: "id" })
    item.deletedAt = new Date()
    await ItemModel.updateOne({ _id }, item)
    return true
  }

  async criar({ item }: CriarProps<Item>): Promise<Item> {
    const isUnique = await this.isUnique({
      props: Object.entries(item).map(([key, value]) => {
        return { prop: key, value }
      }),
    })
    if (!isUnique) throw new RegistroExistenteException({ mensagem: "Já existe um item com os parâmetros informados" })
    item._id = new mongoose.Types.ObjectId()
    const _item = await ItemModel.create(item);
    return this.buscarUm({query: {_id: _item._id}})
  }

  async editar({ _id, item }: EditarProps<Item>): Promise<Item> {
    const query = {
      query: {
        _id,
      },
    }
    const _item = await this.buscarUm(query)
    if (!_item) throw new RegistroInexistenteException({ campo: "id" })
    await ItemModel.updateOne({ _id }, item)
    return this.buscarUm({query: {_id: _item._id}})
  }

  async buscarUm(props: BuscarUmProps): Promise<Item | null> {
    if(!props.query) props.query = {};
    if (!props.query?.deletedAt) {
      props.query.deletedAt = null;
    }
    return ItemModel.findOne(props.query)
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
