export interface ReadProps {}

export interface DataReader<T> {
    read(args: ReadProps): Promise<T>
}