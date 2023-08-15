import { DataReader, ReadProps } from "../ports/dataReader";
import * as fs from "fs";

export interface JsonReadProps extends ReadProps {
  path: string;
}

export class JsonDataReader<T> implements DataReader<T> {
  read(args: JsonReadProps): Promise<T> {
    return new Promise((resolve, reject) => {
      fs.readFile(args.path, "utf-8", (err, data) => {
        if (err) reject();
        if (data === undefined) reject();
        const res = JSON.parse(data) as T;
        resolve(res);
      });
    });
  }
}
