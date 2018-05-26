import { Component, OnInit } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TodoService } from '../todo/shared/todo.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Location } from '@angular/common';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],  
  providers:[
    AuthService,
    AngularFireAuth
    // TodoService
  ]
})
export class LogInComponent implements OnInit {
  xyz=false;
  loginInput = {
    email:'',
    password:''
  }
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    public afAuth:AngularFireAuth,
    private location:Location
  ) {
  }
  ngOnInit() {
  }
  
  callE=()=>{
    this.xyz=true;
  }
  back=()=>{
    this.xyz=false;
  }

  loginSubmit = (form) =>{
    if(form.valid){
      console.log(this.loginInput.email);
      console.log(this.loginInput.password);
      this.router.navigate(['todo']);
    }
  }
  tryGoogleLogin(){
    console.log(this.afAuth);
    this.authService.doGoogleLogin()
    .then(res => {
      localStorage.setItem('accessToken',JSON.stringify(res.credential.accessToken));
      localStorage.setItem('name',res.additionalUserInfo.profile.name);
      //this.name=JSON.parse(res.additionalUserInfo.profile.name);
      // console.log(JSON.parse(res.additionalUserInfo.profile.name));
      // console.log(res.additionalUserInfo.profile.id);
      // console.log(res.additionalUserInfo.profile.email);
      // console.log(res.additionalUserInfo.profile.verified_email);
      // console.log(res.additionalUserInfo.profile.name);
      this.location.replaceState('/');
      this.router.navigate(['todo']);
    }, err=>{
      console.log(err);
      this.errorMessage=err.message;
    }
    )
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }
  // tryLogin(value){
  //   this.authService.doLogin(value)
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //   })
  // }
}
