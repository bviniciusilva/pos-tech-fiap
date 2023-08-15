export class BaseException {
    mensagem: string
    constructor(mensagem?: string) {
        this.mensagem = mensagem ?? '';
    }
}