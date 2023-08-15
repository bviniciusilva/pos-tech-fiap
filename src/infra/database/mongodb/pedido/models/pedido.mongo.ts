import mongoose, { Schema, model } from "mongoose"
import { Pedido, PedidoItemProps } from "@domain/pedido/entities/pedido"
import { ClienteModel } from "@infra/database/mongodb/cliente/models/cliente.mongo"
import { ItemModel } from "@infra/database/mongodb/item/models/item.mongo"

const pedidoItemSchema = new Schema<PedidoItemProps>({
  item: { type: mongoose.Types.ObjectId, required: true, ref: ItemModel },
  qtd: { type: Number, required: true },
},{ _id: false });

const PedidoSchema = new Schema<Pedido>(
  {
    _id: { type: Schema.Types.ObjectId },
    cliente: { type: mongoose.Types.ObjectId, ref: ClienteModel },
    itens: [pedidoItemSchema],
    status: { type: String, required: true },
    valor: { type: Number, required: true },
    deletedAt: { type: Date, required: false, default: null },
  },
  { timestamps: true }
)

export const PedidoModel = model<Pedido>("Pedido", PedidoSchema)
