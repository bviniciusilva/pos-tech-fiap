import { BaseException } from "./base.exception";

export class RegistroInexistenteException extends BaseException {
    constructor({mensagem, campo}:{mensagem?: string, campo?: string}) {
        super(mensagem ?? `O ${campo ?? 'registro'} não existe no repositório!`)
    }
}