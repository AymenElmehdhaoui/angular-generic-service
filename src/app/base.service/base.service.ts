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
    return this.pipeRequestObject(this.http.get<T>(this.base + '/' + id, options));
  }

  save(t: T, options = {}): Observable<T> {
    return this.pipeRequestObject(
      this.http.post<T>(this.base, t, options)
    );
  }

  update(id: any, t: T, options = {}): Observable<T> {
    return this.pipeRequestObject(this.http.put<T>(this.base + '/' + id, t, options));
  }

  findAll(options = {}): Observable<T[]> {
    return this.http.get<T[]>(this.base, options)
      .pipe(
        ...this.pipeMethods
      );
  }

  delete(id: any, options = {}) {
    return this.pipeRequestObject(this.http.delete<T>(this.base + '/' + id, options));
  }

  genericRequest(method: string, api: string, options?: any): Observable<any> {
    let opArray = [method, api, options];
    opArray = opArray.filter((x) => {
      return (x !== (undefined || null || '' || {}));
    });
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

  private pipeRequestObject(request: Observable<T>): Observable<T> {
    return request.pipe(
      ...this.pipeMethods
    );
  }

}
