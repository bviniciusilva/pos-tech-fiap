import { BaseException } from "./base.exception";

export class IsPastDateException extends BaseException {
    constructor(mensagem?: string) {
        super(mensagem ?? `A data deve ser maior que agora!`)
    }
}