import * as Joi from "joi"

import { DTO } from "@shared/ports/dto"
import { statusPedidos } from "@domain/pedido/entities/pedido"

const clienteSchema = Joi.object({
  _id: Joi.any().required(),
}).required()

const itemSchema = Joi.object({
  _id: Joi.any().required(),
}).required()

const itemPedidoSchema = Joi.object({
  item: itemSchema,
  qtd: Joi.number().min(0).required(),
}).required()

export class PedidoDTO {
  static schema = Joi.object({
    cliente: clienteSchema,
    itens: Joi.array().items(itemPedidoSchema).required(),
    status: Joi.string()
      .required()
      .valid(...statusPedidos),
  })

  static validate(req: any, res: any, next: any): boolean {
    const dto = new DTO(PedidoDTO.schema)
    return dto.validate(req, res, next)
  }
}
