import {BaseService} from './base.service';
import {Todo} from './Todo.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TodoService extends BaseService<Todo> {
  constructor(protected http: HttpClient) {
    super('/todos', http);
  }
}
