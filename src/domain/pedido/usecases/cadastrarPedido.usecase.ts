import { Repository } from "src/shared/ports/repository"
import { UseCase } from "src/shared/ports/usecase"
import { Pedido, PedidoProps } from "../entities/pedido"
import { DtoValidationException } from "src/shared/exceptions/dtoValidationError.exception"

export interface CadastrarPedidoDto extends PedidoProps {}

type OutputProps = Pedido

export class CadastrarPedidoUseCase implements UseCase<CadastrarPedidoDto, OutputProps> {
  constructor(private readonly repository: Repository<Pedido>) {}
  async execute(props: CadastrarPedidoDto): Promise<OutputProps> {
    if(!props.cliente || !props.itens || props.itens.length == 0) throw new DtoValidationException(['Registros obrigatórios do pedido não encontrados'])
    const item = new Pedido(props)
    return this.repository.criar({ item })
  }
}
