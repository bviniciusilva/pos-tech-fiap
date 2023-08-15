export interface UseCase<INPUTS, OUTPUTS> {
    execute(props: INPUTS): Promise<OUTPUTS>;
}