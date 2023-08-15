import { Repository } from "@shared/ports/repository";
import { UseCase } from "@shared/ports/usecase";
import { DtoValidationException } from "@shared/exceptions/dtoValidationError.exception";
import { Cliente } from "@domain/cliente/entities/cliente";
import { CadastrarClienteDto } from "@domain/cliente/dtos/cadastrarCliente.dto";
import { CPFInvalidoException } from "@shared/exceptions/cpfInvalido.exception";
import { isCPFValido, sanitizar } from "@shared/utils";


type OutputProps = Cliente

export class CadastrarClienteUseCase implements UseCase<CadastrarClienteDto, OutputProps> {

    constructor(private readonly repository: Repository<Cliente>){}

    async execute(props: CadastrarClienteDto): Promise<OutputProps> {
        if(!props.cpf && !props.email && !props.nome) throw new DtoValidationException(['Ao menos um dos campos é obrigatório']);
        if(props.cpf && !isCPFValido(props.cpf)) throw new CPFInvalidoException()
        if(props.cpf) props.cpf = sanitizar(props.cpf);

        const item = new Cliente(props);
        console.log("🚀 ~ file: cadastrarCliente.usecase.ts:22 ~ CadastrarClienteUseCase ~ execute ~ item:", item)

        return this.repository.criar({item});
    }

}