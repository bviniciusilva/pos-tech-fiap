export interface ConnectionProps {
  database: string;
  user?: string;
  password?: string;
  host?: string;
  port?: number;
}

export default interface Connection {
  props: ConnectionProps;
  connect(): void;
}
