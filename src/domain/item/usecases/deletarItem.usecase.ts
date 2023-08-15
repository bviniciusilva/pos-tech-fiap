import { Repository } from "@shared/ports/repository";
import { UseCase } from "@shared/ports/usecase";
import { DtoValidationException } from "@shared/exceptions/dtoValidationError.exception";
import { Item, ItemProps } from "@domain/item/entities/item";
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception";

interface DeletarItemDto {
  _id: string;
}

type OutputProps = boolean;

export class DeletarItemUseCase
  implements UseCase<DeletarItemDto, OutputProps>
{
  constructor(private readonly repository: Repository<Item>) {}

  async execute({ _id }: DeletarItemDto): Promise<OutputProps> {
    return await this.repository.deletar({ _id });
  }
}
