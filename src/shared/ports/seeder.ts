export interface Seeder {
    seed(): Promise<number>;
}