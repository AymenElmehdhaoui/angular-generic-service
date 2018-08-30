import {IBase} from './base.interface';
import {catchError, map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

export class BaseService<T> implements IBase<T> {
  private pipeMethods = [map(this.extractData), catchError(this.handleError)];

  constructor(protected base: string, protected http: HttpClient) {
    this.base = environment.globalUrl.concat(this.base);
  }

  findOne(id: any, options = {}): Observable<T> {
    return this.http.get<T>(this.base + '/' + id, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  findAll(options = {}): Observable<T[]> {
    return this.http.get<T[]>(this.base, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  save(t: T, options = {}): Observable<T> {
    return this.http.post<T>(this.base, t, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  update(id: any, t: T, options = {}): Observable<T> {
    return this.http.put<T>(this.base + '/' + id, t, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  delete(id: any, options?: any): Observable<T> {
    return this.http.delete<T>(this.base + '/' + id, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  genericRequest(method: string, api: string, options: any = {}): Observable<any> {
    return this.http.request(method, api, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  protected extractData(res: Response) {
    // Some Logic
    // console.log(res);
    return res || '';
  }

  protected handleError(error: Response | any) {
    let msg: any;
    if (error instanceof Response) {
      msg = error.json() || '';
    } else {
      msg = error.message ? error.message : error.toString();
    }

    return throwError(msg);
  }
}
