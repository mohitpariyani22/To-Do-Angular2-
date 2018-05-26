import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../log-in/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray:any[];        //toDoListArray is a array here of type any
  value:any;
  edit:boolean=true;
  editItemKey:any;
  name:string='';
  
  constructor(
    private router: Router,
    private toDoService:TodoService,
    public authService: AuthService,
  ) {
    this.name=localStorage.getItem('name');
  }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item=>{
      this.toDoListArray=[];
      item.forEach(element=>{
        var x=element.payload.toJSON();
        x['$key']=element.key;
        this.toDoListArray.push(x);
      })

      this.toDoListArray.sort((a,b)=>{
        return a.isChecked-b.isChecked;
      })
    });

  }
  onEdit($key:string,itemTitle){
    this.value=itemTitle;
    this.toDoService.editTitle($key,itemTitle);
    this.edit=false;
    this.editItemKey=$key;
  }
  updateList(){
    this.toDoService.editTitle(this.editItemKey,this.value);
    this.edit=true;
    this.value='';
  }
  logout(){
    this.authService.logout();
  }
  onAdd(itemTitle){
    if(itemTitle.value==""){
      return false;
    }else{
      this.toDoService.addTitle(itemTitle.value);
      itemTitle.value=null;
    }
    this.edit=true;
  }
  alertCheck($key:string,isChecked){
    this.toDoService.checkOrUncheckTitle($key,!isChecked);
  } 
  onDelete($key:string){
    this.toDoService.removeTitle($key);
    this.value='';
  }
  onPressEnter($x:number,itemTitle){
    if(this.edit==false){
      if($x===13){
        this.updateList();
      }
    }else{
      if($x===13){
        this.onAdd(itemTitle);
      }
    }
  }
  active($y:string){
     console.log($y);
  }
}
