import { Schema, model } from "mongoose"
import { Cliente } from "@domain/cliente/entities/cliente"
import { Item } from "src/domain/item/entities/item"

const ItemSchema = new Schema<Item>(
  {
    _id: { type: Schema.Types.ObjectId },
    tipo: { type: String, required: true },
    medida: { type: String, required: true },
    nome: { type: String, required: true },
    descricao: { type: String, required: false, default: null },
    aceitaOpcional: { type: Boolean, required: true },
    preco: { type: Number, required: true },
    deletedAt: { type: Date, required: false, default: null },
  },
  { timestamps: true }
)

export const ItemModel = model<Item>("Item", ItemSchema)
