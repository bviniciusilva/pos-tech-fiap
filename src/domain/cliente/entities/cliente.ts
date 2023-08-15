import { IsPastDateException } from "@shared/exceptions/isPastDate.exception";
import { NotNullException } from "@shared/exceptions/notNull.exception";
import {v4 as uuid} from 'uuid';
import { DefaultClass } from "@shared/types/defaultClass";

export interface ClienteProps {
  _id?: any;
  nome?: string;
  email?: string;
  cpf?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Cliente extends DefaultClass {
  _id?: any;
  nome?: string;
  email?: string;
  cpf?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: ClienteProps) {
    super();
    Object.assign(this, props);
  }
  
  generateId() {
    if(!this._id) {
      this._id = uuid();
    }
  }


  // get id(): any {
  //   return this.props.id ?? "";
  // }
  // get nome() {
  //   return this.props.nome;
  // }
  // get email() {
  //   return this.props.email;
  // }
  // get cpf() {
  //   return this.props.cpf;
  // }
  // get createdAt() {
  //   return this.props.createdAt ?? new Date();
  // }
  // get updatedAt() {
  //   return this.props.updatedAt;
  // }
  // get deletedAt(): Date | undefined {
  //   return this.props.deletedAt;
  // }

  // set id(_id: string) {
  //   this.props.id = _id;
  // }
  // set nome(_nome: string | undefined) {
  //   this.props.nome = _nome;
  // }
  // set email(_email: string | undefined) {
  //   this.props.email = _email;
  // }
  // set cpf(_cpf: string | undefined) {
  //   this.props.cpf = _cpf;
  // }
  // set createdAt(_createdAt: Date) {
  //   if (!_createdAt) throw new NotNullException({ campo: "createdAt" });
  //   if (_createdAt < new Date()) throw new IsPastDateException();
  //   this.props.createdAt = _createdAt;
  // }
  // set updatedAt(_updatedAt: Date | undefined) {
  //   if (!_updatedAt) throw new NotNullException({ campo: "_updatedAt" });
  //   if (_updatedAt < new Date()) throw new IsPastDateException();
  //   this.props.updatedAt = _updatedAt;
  // }
  // set deletedAt(_deletedAt: Date | undefined) {
  //   if (!_deletedAt) throw new NotNullException({ campo: "_deletedAt" });
  //   if (_deletedAt < new Date()) throw new IsPastDateException();
  //   this.props.deletedAt = _deletedAt;
  // }
}
