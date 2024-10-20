import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected-component.component';
import { SearchUserComponent } from './components/search-user.component'; 
import { FriendsChatComponent } from './components/friends-chat.component'; 
import { ApiService } from './services/api.service';
import { UserService } from './services/userservice.service'; 
import { AuthInterceptor } from './services/apiInterceptors.service';
import { AuthGuard } from './guards/Auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchUserComponent },
  { path: 'friends-chat', component: FriendsChatComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    SearchUserComponent,
    FriendsChatComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ApiService,
    UserService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
