import * as Joi from "joi";

export class DTO {
  private schema: Joi.ObjectSchema<any>;

  constructor(schema: Joi.ObjectSchema<any>) {
    this.schema = schema;
  }

  validate(req: any, res: any, next: any) {
    const { error } = this.schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e) => e.message) });
    }
    next();
  }
}
