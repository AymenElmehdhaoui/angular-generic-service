import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

export interface IBase<T> {
  findOne(id: any, options?: any): Observable<T>;

  findAll(options?: any): Observable<T[]>;

  save(t: T, options?: any): Observable<T>;

  update(id: any, t: T, options?: any): Observable<T>;

  delete(id: any, options?: any): Observable<T>;

  genericRequest(method: string, api: string, options?: any): Observable<any>;
}
