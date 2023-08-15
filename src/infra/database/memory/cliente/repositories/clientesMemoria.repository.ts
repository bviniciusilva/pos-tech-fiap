import {
  BuscarUmProps,
  CriarProps,
  DeletarProps,
  EditarProps,
  IsUniqueProps,
  Repository,
} from "@shared/ports/repository"
import { RegistroExistenteException } from "@shared/exceptions/registroExistente.exception"
import { Cliente } from "@domain/cliente/entities/cliente"
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception"

export class ClienteMemoriaRepository implements Repository<Cliente> {
  private static instance: ClienteMemoriaRepository
  static clientes: Cliente[] = []

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }

  async listar(): Promise<Cliente[]> {
    return ClienteMemoriaRepository.clientes.filter((i) => !i.deletedAt)
  }

  async deletar({ _id }: DeletarProps): Promise<boolean> {
    const item = await this.buscarUm({ query: { _id } })
    if (!item) throw new RegistroInexistenteException({ campo: "id" })
    item.deletedAt = new Date()
    return true
  }

  async criar({ item }: CriarProps<Cliente>): Promise<Cliente> {
    const isEmailUnique =
      item.email &&
      (await this.isUnique({
        prop: "email",
        value: item.email,
      }))
    if (isEmailUnique === false)
      throw new RegistroExistenteException({
        mensagem: `Já existe um registro com email ${item.email}`,
      })
    const isCpfUnique =
      item.cpf &&
      (await this.isUnique({
        prop: "cpf",
        value: item.cpf,
      }))
    if (isCpfUnique === false)
      throw new RegistroExistenteException({
        mensagem: `Já existe um registro com cpf ${item.cpf}`,
      })
    const isNomeUnique =
      item.nome &&
      (await this.isUnique({
        prop: "nome",
        value: item.nome,
      }))
    if (isNomeUnique === false)
      throw new RegistroExistenteException({
        mensagem: `Já existe um registro com nome ${item.nome}`,
      })
    const cliente = await this.buscarUm({
      query: {
        id: item._id,
      },
    })
    if (item._id && cliente) throw new RegistroExistenteException({})
    if (!item._id) item.generateId()
    item.createdAt = new Date()
    item.updatedAt = new Date()
    ClienteMemoriaRepository.clientes.push(item)
    return item;
  }

  async editar({ _id, item }: EditarProps<Cliente>): Promise<Cliente> {
    const itemIndex = ClienteMemoriaRepository.clientes.findIndex((_item) => _item._id == item._id)
    if (itemIndex < 0) throw new RegistroInexistenteException({})
    let cliente = ClienteMemoriaRepository.clientes[itemIndex]
    Object.entries(item).forEach(([key, value]) => {
      cliente[key] = value
    })
    return ClienteMemoriaRepository.clientes[itemIndex]
  }

  async buscarUm(props: BuscarUmProps): Promise<Cliente | null> {
    return (
      ClienteMemoriaRepository.clientes.find((_item) => {
        let hasValue = true
        Object.entries(props.query).forEach(([key, value]) => {
          // @ts-ignore
          if (_item[key] !== undefined && _item[key] != value) hasValue = false
        })
        return hasValue
      }) ?? null
    )
  }

  async isUnique(props: IsUniqueProps): Promise<boolean> {
    for (let index = 0; index < ClienteMemoriaRepository.clientes.length; index++) {
      const item = ClienteMemoriaRepository.clientes[index]
      if (
        // @ts-ignore
        item[props.prop] !== undefined &&
        // @ts-ignore
        item[props.prop] == props.value &&
        item._id != props.ignoreId
      )
        return false
    }
    return true
  }
}
