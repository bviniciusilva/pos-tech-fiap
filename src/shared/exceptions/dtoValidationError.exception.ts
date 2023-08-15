import { BaseException } from "./base.exception";

export class DtoValidationException extends BaseException {
  constructor(errors: string[]) {
    let mensagem = "";
    errors.forEach(
      (e) =>
        mensagem +
        `
        ${e}`
    );
    super(mensagem);
  }
}
