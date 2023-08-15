import { BaseException } from "./base.exception";

export class RegistroExistenteException extends BaseException {
    constructor({mensagem, campo}:{mensagem?: string, campo?: string}) {
        super(mensagem ?? `O ${campo ?? 'registro'} já existe no repositório!`)
    }
}