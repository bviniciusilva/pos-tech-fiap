import {Schema, model} from "mongoose";
import { Cliente } from "@domain/cliente/entities/cliente";

const ClienteSchema = new Schema<Cliente>(
  {
    _id: { type: Schema.Types.ObjectId },
    nome: { type: String, required: false },
    email: { type: String, required: false },
    cpf: { type: String, required: false },
    deletedAt: { type: Date, required: false, default: null },
  },
  { timestamps: true }
);

export const ClienteModel = model<Cliente>("Cliente", ClienteSchema);
