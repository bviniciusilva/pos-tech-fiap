import { BaseException } from "./base.exception";

export class IsNotNaturalNumberException extends BaseException {
    constructor(mensagem?: string) {
        super(mensagem ?? `O número deve ser maior ou igual a zero!`)
    }
}