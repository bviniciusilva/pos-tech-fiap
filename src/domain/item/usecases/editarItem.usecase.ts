import { Repository } from "@shared/ports/repository";
import { UseCase } from "@shared/ports/usecase";
import { DtoValidationException } from "@shared/exceptions/dtoValidationError.exception";
import { Item, ItemProps } from "@domain/item/entities/item";
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception";

interface EditarItemDto extends ItemProps {}

type OutputProps = Item;

export class EditarItemUseCase
  implements UseCase<EditarItemDto, OutputProps>
{
  constructor(private readonly repository: Repository<Item>) {}

  async execute(props: EditarItemDto): Promise<OutputProps> {
    const item = await this.repository.buscarUm({
      query: { _id: props._id },
    });
    Object.entries(props).forEach(([key, value]) => {
      item[key] = value;
    })
    if(!item) throw new RegistroInexistenteException({});
    return await this.repository.editar({_id: props._id, item});
  }
}
