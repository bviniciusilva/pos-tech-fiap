import { Repository } from "@shared/ports/repository";
import { UseCase } from "@shared/ports/usecase";
import { DtoValidationException } from "@shared/exceptions/dtoValidationError.exception";
import { Item, ItemProps } from "@domain/item/entities/item";

interface CadastrarItemDto extends ItemProps {}

type OutputProps = Item;

export class CadastrarItemUseCase
  implements UseCase<CadastrarItemDto, OutputProps>
{
  constructor(private readonly repository: Repository<Item>) {}

  async execute(props: CadastrarItemDto): Promise<OutputProps> {
    // if(!props.cpf || !props.email || !props.nome) throw new DtoValidationException(['Ao menos um dos campos é obrigatório']);

    const item = new Item(props);

    return await this.repository.criar({item});
  }
}
