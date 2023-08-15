import { JsonDataReader } from "@shared/adapters/jsonDataReader";
import { ItemProps } from "@domain/item/entities/item";
import { ItemMemoriaRepository } from "@infra/database/memory/item/repositories/itemMemoria.repository";
import { ItemSeeder } from "@infra/database/memory/item/seeders/item.seeder";
import { EditarItemUseCase } from "@domain/item/usecases/editarItem.usecase";

const itensDataReader = new JsonDataReader<ItemProps[]>();
const itensRepository = ItemMemoriaRepository.Instance;

describe('Testando itens',()=>{
  test("Deve cadastrar um item", async function () {
    const itensSeeder = new ItemSeeder(itensRepository, itensDataReader);
    const expectedLength = await itensSeeder.seed();
    const output = await itensRepository.listar();
    expect(output).toHaveLength(expectedLength);
  });
  
  test("Deve editar um item", async function () {
    const editarItemUseCase = new EditarItemUseCase(itensRepository);
    const itens = await itensRepository.listar();
    if (itens[0]) {
      const newItemProps: ItemProps = {
        _id: itens[0]._id,
        nome: "Big Mac",
        tipo: "lanche",
        preco: 39.9,
        medida: "unidade",
        aceitaOpcional: true,
        descricao:
          "Hambúrguer (100% carne bovina), alface americana, queijo cheddar, maionese Big Mac, cebola, picles e pão com gergelim",
      };
      const output = await editarItemUseCase.execute(newItemProps);
      expect(output).toMatchObject(newItemProps);
    }
  
    //   expect(output).toHaveLength(expectedLength);
  });
  
  test("Deve deletar um item", async function () {
    const initialLength = (await itensRepository.listar())?.length;
    const item = (await itensRepository.listar())[0];
    const output = await itensRepository.deletar({ _id: item._id });
    const endLength = (await itensRepository.listar())?.length;
    expect(output).toBeTruthy();
    expect(endLength).toBe(initialLength - 1);
  });
})
