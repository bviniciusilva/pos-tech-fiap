import { DataReader } from "@shared/ports/dataReader";
import { Repository } from "@shared/ports/repository";
import { Seeder } from "@shared/ports/seeder";
import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente";
import { CadastrarClienteUseCase } from "@domain/cliente/usecases/cadastrarCliente.usecase";

export class ClienteSeeder implements Seeder {
  private cadastrarClienteUseCase: CadastrarClienteUseCase;
  constructor(
    private readonly repository: Repository<Cliente>,
    private readonly dataReader: DataReader<ClienteProps[]>
  ) {
    this.cadastrarClienteUseCase = new CadastrarClienteUseCase(repository);
  }

  async seed(): Promise<number> {
    try {
      const data = await this.dataReader.read({
        path: "src/domain/cliente/data/clientes.json",
      });
      await Promise.all(
        data.map(async (cliente) => {
          try {
            await this.cadastrarClienteUseCase.execute(cliente);
          } catch (error) {
          }
        })
      );

      return data.length;
    } catch (error) {
      throw error;
    }
  }
}
