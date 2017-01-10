import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
//import { Todo } from './todo';

//import { ReplaySubject } from 'rxjs/ReplaySubject';

//import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogloginSvc {

 // todos: Todo[] = [];
 // newTodo: Todo = { _id: 0, title: "" };
 
 // API_PTH = window.location.origin;  
 API_PTH = "http://localhost:8100"
 //API_PTH = "http://127.0.0.1:8100/"

  constructor(private http: Http) { }
  // Observable todos source
  //private _todosSource = new ReplaySubject<Todo[]>(1);

  // Observable todos stream
  //todos$ = this._todosSource.asObservable();
  logPath = this.API_PTH + "/login";
  
  addLogin(loginAuth: string): Promise<string> {
    
    console.log("----->logpath:", this.logPath, " / ", loginAuth);
    return this.http
    .post(this.logPath, loginAuth)
    //.map(res => res.json())
    .toPromise().then( res => {
         console.log("Ecriture effectuée", res)
    })
    .catch( err => console.log("catch err",err));
  }
   //this.todos.push(res.json())
   // this._todosSource.next(this.todos);


//  deleteTodoById( _id: number): Promise<Todo> {
//    return this.http
//      .delete( "/" + _id)
//      .toPromise()
//      .then((res) => {
//        console.log("delete response", res.json())
//        this.todos = this.todos.filter( todo => todo._id !== _id )
//        this._todosSource.next(this.todos);
//      })
//      .catch((err) => console.log(err));
//  }

// getAllTodos(): Promise<Todo[]> {
//    return this.http
//      .get("/todos")
//      .toPromise()
//      .then((res) => { this.todos = res.json() })
//      .catch((err) => console.log(err));
//  }
}

