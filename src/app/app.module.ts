// Requirements
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Fiirebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// Services
import { AuthService } from './log-in/auth/auth.service'
import { TodoService } from './todo/shared/todo.service';
import { OnlyLoggedInUsersGuard, AnonymousGuardService  } from './AlwaysAuthGuard.service';

// Components
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LogInComponent } from './log-in/log-in.component';
import { environment } from '../environments/environment';
import { FormValidComponent } from './form-valid/form-valid.component';



const appRoutes:Routes=[
  { 
    path:'',
    component:LogInComponent,
    canActivate:[ AnonymousGuardService ]
  },
  { 
    path:'todo',
    component:TodoComponent,
    canActivate: [ OnlyLoggedInUsersGuard,  ]
  },
  { 
    path:'logOut',
    component:LogOutComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LogOutComponent,
    LogInComponent,
    FormValidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [
    AuthService,
    TodoService,
    AngularFireAuth,
    OnlyLoggedInUsersGuard,
    AnonymousGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
