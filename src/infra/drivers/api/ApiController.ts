import { ClienteController } from "@domain/cliente/controllers/ClienteController"
import { ItemController } from "@domain/item/controllers/ItemController"
import { ClienteMongoRepository } from "@infra/database/mongodb/cliente/repositories/clientesMongo.repository"
import { ItemMongoRepository } from "@infra/database/mongodb/item/repositories/itensMongo.repository"
import { PedidoController } from "@domain/pedido/controllers/PedidoController"
import { PedidoMongoRepository } from "@infra/database/mongodb/pedido/repositories/pedidosMongo.repository"
import config from "@shared/config";
import { ClienteMemoriaRepository } from "src/infra/database/memory/cliente/repositories/clientesMemoria.repository"
import { ItemMemoriaRepository } from "src/infra/database/memory/item/repositories/itemMemoria.repository"
import { PedidoMemoriaRepository } from "src/infra/database/memory/pedido/repositories/pedidosMemoria.repository"

export class ApiController {
  private static instance: ApiController
  clienteController: ClienteController
  itemController: ItemController
  pedidoController: PedidoController

  constructor() {
    let clienteRepo = new ClienteMemoriaRepository();
    let itemRepo = new ItemMemoriaRepository();
    let pedidoRepo = new PedidoMemoriaRepository()
    if(config.NODE_ENV == 'production' || config.NODE_ENV == 'debug') {
      clienteRepo = new ClienteMongoRepository()
      // @ts-ignore
      itemRepo = new ItemMongoRepository()
      pedidoRepo = new PedidoMongoRepository(clienteRepo, itemRepo)
    }
    this.clienteController = new ClienteController(clienteRepo)
    this.itemController = new ItemController(itemRepo)
    this.pedidoController = new PedidoController(pedidoRepo)
  }

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }
}
