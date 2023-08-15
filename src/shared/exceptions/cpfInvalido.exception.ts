import { BaseException } from "./base.exception";

export class CPFInvalidoException extends BaseException {
    constructor() {
        super(`O CPF informado é inválido`)
    }
}