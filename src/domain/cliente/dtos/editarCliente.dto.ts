import { ClienteDto } from "@domain/cliente/dtos/cliente.dto"

export interface EditarClienteDto {
    _id: any;
    props: ClienteDto;
}