import { BaseException } from "./base.exception";

export class NotNullException extends BaseException {
    constructor({mensagem, campo}:{mensagem?: string, campo?: string}) {
        super(mensagem ?? `O ${campo ?? 'registro'} não deve ser nulo!`)
    }
}