import { DataReader } from "@shared/ports/dataReader";
import { Repository } from "@shared/ports/repository";
import { Seeder } from "@shared/ports/seeder";
import { Item, ItemProps } from "@domain/item/entities/item";
import { CadastrarItemUseCase } from "@domain/item/usecases/cadastrarItem.usecase";

export class ItemSeeder implements Seeder {
  private cadastrarItemUseCase: CadastrarItemUseCase;
  constructor(
    private readonly repository: Repository<Item>,
    private readonly itensDataReader: DataReader<ItemProps[]>
  ) {
    this.cadastrarItemUseCase = new CadastrarItemUseCase(repository);
  }

  async seed(): Promise<number> {
    try {
      const data = await this.itensDataReader.read({
        path: "src/domain/item/data/itens.json",
      });
      await Promise.all(
        data.map(async (item) => {
          await this.cadastrarItemUseCase.execute(item);
        })
      );

      return data.length;
    } catch (error) {
      throw error;
    }
  }
}
