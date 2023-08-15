export interface FindUniqueProps {
    prop: string;
    value: string;
}

export interface IsUniqueProps extends FindUniqueProps {
    ignoreId?: string;
}

export interface IsUniqueManyProps {
    props: FindUniqueProps[];
    ignoreId?: string;
}

export interface BuscarUmProps {
    query: any;
}
export interface DeletarProps {
    _id: string;
}

export interface EditarProps<T> {
    _id: string;
    item: T
}

export interface CriarProps<T> {
    item: T
}

export interface Repository<T> {
    criar(props: CriarProps<T>): Promise<T>;
    editar(props: EditarProps<T>): Promise<T>;
    buscarUm(props: BuscarUmProps): Promise<T | null>;
    listar(queryProps?: Object): Promise<T[]>;
    isUnique?(props: IsUniqueProps | IsUniqueManyProps): Promise<boolean>;
    deletar(props: DeletarProps): Promise<boolean>;
}