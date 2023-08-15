import * as Joi from "joi";

import { DTO } from "@shared/ports/dto";
import { medidasItem, tiposItem } from "@domain/item/entities/item";

export class ItemDTO {
  static schema = Joi.object({
    tipo: Joi.string().required().valid(...tiposItem),
    medida: Joi.string().required().valid(...medidasItem),
    nome: Joi.string().required(),
    descricao: Joi.string().optional(),
    aceitaOpcional: Joi.boolean().required(),
    preco: Joi.number().required(),
  });

  static validate(req: any, res: any, next: any): boolean {
    const dto = new DTO(ItemDTO.schema);
    return dto.validate(req, res, next);
  }
}
