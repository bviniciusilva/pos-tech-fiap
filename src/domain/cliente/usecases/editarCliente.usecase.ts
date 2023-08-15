import { Repository } from "@shared/ports/repository";
import { UseCase } from "@shared/ports/usecase";
import { DtoValidationException } from "@shared/exceptions/dtoValidationError.exception";
import { Cliente } from "@domain/cliente/entities/cliente";
import { EditarClienteDto } from "@domain/cliente/dtos/editarCliente.dto";
import { CPFInvalidoException } from "@shared/exceptions/cpfInvalido.exception";
import { isCPFValido, sanitizar } from "@shared/utils";


type OutputProps = Cliente

export class EditarClienteUseCase implements UseCase<EditarClienteDto, OutputProps> {

    constructor(private readonly repository: Repository<Cliente>){}

    async execute({_id, props}: EditarClienteDto): Promise<OutputProps> {
        if(!props.cpf && !props.email && !props.nome) throw new DtoValidationException(['Ao menos um dos campos é obrigatório']);
        if(props.cpf && !isCPFValido(props.cpf)) throw new CPFInvalidoException()
        if(props.cpf) props.cpf = sanitizar(props.cpf);

        const item = new Cliente(props);

        return this.repository.editar({_id, item});
    }

}