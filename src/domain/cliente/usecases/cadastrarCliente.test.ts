import { JsonDataReader } from "@shared/adapters/jsonDataReader";
import { ClienteProps } from "@domain/cliente/entities/cliente";
import { ClienteMemoriaRepository } from "@infra/database/memory/cliente/repositories/clientesMemoria.repository";
import { ClienteSeeder } from "@infra/database/memory/cliente/seeders/cliente.seeder";

test('Deve cadastrar um cliente', async function () {
    const clientesRepository = new ClienteMemoriaRepository();
    const clientesDataReader = new JsonDataReader<Array<ClienteProps>>();
    const clientesSeeder = new ClienteSeeder(clientesRepository,clientesDataReader);
    const expectedLength = await clientesSeeder.seed();
    const output = await clientesRepository.listar();
    expect(output).toHaveLength(expectedLength);
})