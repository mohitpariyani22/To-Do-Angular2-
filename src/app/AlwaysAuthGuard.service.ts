import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild} from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()

export class OnlyLoggedInUsersGuard  implements CanActivate{
    constructor(
        private router: Router,
        public afAuth:AngularFireAuth
      ) {
      }
    canActivate(){
        if(localStorage.getItem('accessToken')){
        console.log('AlwaysAuthGuard ');
        // this.router.navigate(['todo']);
        return true;
        }
        else{
            // this.router.navigate(['']);
            return false;
        }
    }
}
export class AnonymousGuardService implements CanActivate, CanActivateChild {

    canActivate() {
    const token = localStorage.getItem('accessToken');
    if(token){
    return false;
    }else{
    return true;
    }
    }
    
    canActivateChild() {
    console.log('checking child route access');
    return true;
    }
    
    }