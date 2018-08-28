import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

export interface IBase<T> {
  save(t: T): Observable<T>;

  update(id: any, t: T): Observable<T>;

  findOne(id: any): Observable<T>;

  findAll(): Observable<T[]>;

  delete(id: any): Observable<T>;
}
