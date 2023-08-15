import { Repository } from "@shared/ports/repository"
import { Item, ItemProps } from "@domain/item/entities/item"
import { EditarItemUseCase } from "../usecases/editarItem.usecase";

export class ItemController {
  private readonly cadastrarUseCase: EditarItemUseCase;
  constructor(private readonly repository: Repository<Item>) {
    this.cadastrarUseCase = new EditarItemUseCase(this.repository)
  }

  async listar(queryProps?: Object) {
    return this.repository.listar(queryProps)
  }

  async buscarUm(_id: string) {
    return this.repository.buscarUm({
      query: {
        _id,
      },
    })
  }

  async criar(body: ItemProps) {
    return this.cadastrarUseCase.execute(body)
  }

  async editar(_id: string, body: ItemProps) {
    const item = new Item(body)
    return this.repository.editar({ _id, item })
  }

  async deletar(_id: string) {
    return this.repository.deletar({ _id })
  }
}
