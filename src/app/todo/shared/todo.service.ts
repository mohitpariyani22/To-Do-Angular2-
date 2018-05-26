import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase,public afAuth: AngularFireAuth) { 

  }
  getToDoList(){
    this.toDoList=this.firebasedb.list('titles');
    return this.toDoList;
  }
  addTitle(title:string){
    this.toDoList.push({
      title:title,
      isChecked:false
    });
  }
  editTitle($key:string,title:any){
    console.log($key,title);
    this.toDoList.update($key,{title:title});
  }
  checkOrUncheckTitle($key:string,flag:boolean){
    this.toDoList.update($key,{isChecked:flag});
  }
  removeTitle($key:string){
   this.toDoList.remove($key);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
