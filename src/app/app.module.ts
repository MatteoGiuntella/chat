import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; // Assicurati che il percorso sia corretto
import { ApiService } from './services/api.service'; // Assicurati che il percorso sia corretto
import { AuthInterceptor } from './services/apiInterceptors.service'; // Assicurati che il percorso sia corretto
import { AuthGuard } from './guards/auth.guard'; // Assicurati che il percorso sia corretto
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './components/protected-component.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] }, // Rotta protetta
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ApiService,
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
