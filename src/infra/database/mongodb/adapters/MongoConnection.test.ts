import MongoConnection from "./MongoConnection"

test('Deve conectar a um cliente mongodb', async () => {
    const client = new MongoConnection({
        database: 'america',
    });
    const connectionResponse = await client.connect();
    expect(connectionResponse).toBeTruthy();
})