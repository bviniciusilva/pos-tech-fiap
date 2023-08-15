import { PedidoMemoriaRepository } from "@infra/database/memory/pedido/repositories/pedidosMemoria.repository"
import { Pedido, PedidoProps } from "@domain/pedido/entities/pedido"
import { ItemMemoriaRepository } from "@infra/database/memory/item/repositories/itemMemoria.repository"
import { ClienteMemoriaRepository } from "@infra/database/memory/cliente/repositories/clientesMemoria.repository"
import { ClienteSeeder } from "@infra/database/memory/cliente/seeders/cliente.seeder"
import { ClienteProps } from "src/domain/cliente/entities/cliente"
import { ItemProps } from "src/domain/item/entities/item"
import { JsonDataReader } from "src/shared/adapters/jsonDataReader"
import { ItemSeeder } from "src/infra/database/memory/item/seeders/item.seeder"
import { CadastrarPedidoUseCase } from "./cadastrarPedido.usecase"

const clientesDataReader = new JsonDataReader<ClienteProps[]>()
const itensDataReader = new JsonDataReader<ItemProps[]>()
const pedidosRepository = PedidoMemoriaRepository.Instance
const clientesRepository = ClienteMemoriaRepository.Instance
const itensRepository = ItemMemoriaRepository.Instance
const clientesSeeder = new ClienteSeeder(clientesRepository, clientesDataReader)
const itensSeeder = new ItemSeeder(itensRepository, itensDataReader)

describe("Testando pedidos", () => {
  test("Deve cadastrar um pedido", async function () {
    await clientesSeeder.seed()
    await itensSeeder.seed()
    const cliente = ClienteMemoriaRepository.clientes[0]
    const item1 = ItemMemoriaRepository.itens[0]
    const item2 = ItemMemoriaRepository.itens[1]
    const usecase = new CadastrarPedidoUseCase(pedidosRepository);
    let props: PedidoProps = {
        cliente,
        itens: [{item: item1, qtd: 1}, {item: item2, qtd: 2}],
        status: "aberto",
    }
    let valor = item1.preco + (item2.preco * 2);
    const pedido = await usecase.execute(props);
    expect(pedido).toBeDefined()
    const output = await pedidosRepository.listar()
    expect(output).toHaveLength(1)
    expect(output[0].valor).toBe(valor)
  })
})
