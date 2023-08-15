import { Repository } from "src/shared/ports/repository"
import { UseCase } from "src/shared/ports/usecase"
import { Pedido, PedidoProps } from "../entities/pedido"
import { DtoValidationException } from "src/shared/exceptions/dtoValidationError.exception"

export interface EditarPedidoDto {
    _id: any;
    props: PedidoProps
}

type OutputProps = Pedido

export class EditarPedidoUseCase implements UseCase<EditarPedidoDto, OutputProps> {
  constructor(private readonly repository: Repository<Pedido>) {}
  async execute({_id, props}: EditarPedidoDto): Promise<OutputProps> {
    if(!props.cliente || !props.itens || props.itens.length == 0) throw new DtoValidationException(['Registros obrigatórios do pedido não encontrados'])
    const item = new Pedido(props)
    return this.repository.editar({ _id, item })
  }
}
