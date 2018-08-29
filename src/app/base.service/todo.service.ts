import {BaseService} from './base.service';
import {Todo} from './Todo.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TodoService extends BaseService<Todo> {
  constructor(protected http: HttpClient) {
    super('/todos', http);
  }

  search(search: string) {
    const params = new HttpParams().set('search', search);
    return this.genericRequest('GET', this.base + '/' + 'search', {params});
  }
}
