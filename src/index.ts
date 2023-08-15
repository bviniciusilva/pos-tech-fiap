import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente";
import { ClienteMemoriaRepository } from "@infra/database/memory/cliente/repositories/clientesMemoria.repository";
import { ClienteSeeder } from "@infra/database/memory/cliente/seeders/cliente.seeder";
import { Item, ItemProps } from "@domain/item/entities/item";
import { ItemMemoriaRepository } from "@infra/database/memory/item/repositories/itemMemoria.repository";
import { ItemSeeder } from "@infra/database/memory/item/seeders/item.seeder";
import { JsonDataReader } from "@shared/adapters/jsonDataReader";
import MongoConnection from "@infra/database/mongodb/adapters/MongoConnection";
import { ClienteMongoRepository } from "@infra/database/mongodb/cliente/repositories/clientesMongo.repository";
import config from "@shared/config";
import { Repository } from "./shared/ports/repository";
import { ItemMongoRepository } from "./infra/database/mongodb/item/repositories/itensMongo.repository";

const isMemoryDatabase = config.NODE_ENV == 'production' || config.NODE_ENV == 'debug';
// DATAREADERS ===================================================================
const clientesDataReader = new JsonDataReader<ClienteProps[]>();
const itensDataReader = new JsonDataReader<ItemProps[]>();


// REPOSITORIES===================================================================
let clientesRepository: Repository<Cliente>;
let itensRepository: Repository<Item>;
if(!isMemoryDatabase) {
  clientesRepository = new ClienteMongoRepository();
  itensRepository = new ItemMongoRepository();
} else {
  clientesRepository = ClienteMemoriaRepository.Instance;
  itensRepository = ItemMemoriaRepository.Instance;
}

// SEEDERS =======================================================================
const clientesSeeder = new ClienteSeeder(
  clientesRepository,
  clientesDataReader
);
const itensSeeder = new ItemSeeder(itensRepository, itensDataReader);

async function bootstrap() {
  try {
    if(!isMemoryDatabase) {
      const client = new MongoConnection({
        database: "projetos",
      });
      await client.connect();
    } else {
      console.time('seeding');
      console.log("SEEDING STARTED...");
      await clientesSeeder.seed();
      await itensSeeder.seed();
      console.log(`SEEDING FINISHED...`);
      console.timeEnd('seeding');
    }
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
