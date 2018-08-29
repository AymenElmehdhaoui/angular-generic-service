import { environment } from './../environments/environment.prod';
import {Component, OnInit} from '@angular/core';
import {TodoService} from './base.service/todo.service';
import {Todo} from './base.service/Todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: TodoService) {}

  ngOnInit() {
    const toDo = new Todo(1, 1, 'delectus aut autem', false);
    this.userService.findOne(toDo.id).subscribe((toDoFind: Todo) => console.log('findOne', toDoFind));
    this.userService.save(toDo).subscribe((toDoSave: Todo) => console.log('save', toDoSave));
    this.userService.delete(toDo.id).subscribe((toDoDelete: Todo) => console.log('save', toDoDelete));
    this.userService.update(toDo.id, toDo).subscribe((toDoUpdade: Todo) => console.log('update', toDoUpdade));
    this.userService.findAll().subscribe((todos: Todo[]) => console.log('findAll', todos));
    this.userService.search('hello').subscribe();
  }
}
