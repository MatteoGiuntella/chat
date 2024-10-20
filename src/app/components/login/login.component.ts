import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; 
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  template: `
    <h2 class="text-center text-white">Login</h2>
    <div class="container d-flex justify-content-center container-login w-50 shadow-lg">
      <form #f="ngForm" (ngSubmit)="onSubmit(f)">

        <div data-mdb-input-init class="form-outline m-4">
          <input type="text" id="username" class="form-control" [(ngModel)]="user.username" name="username" required />
          <label class="form-label text-white" for="username">Username</label>
        </div>

        <div data-mdb-input-init class="form-outline m-4">
          <input type="password" id="password" class="form-control" [(ngModel)]="user.password" name="password" required />
          <label class="form-label text-white" for="password">Password</label>
        </div>

        <!-- appare se c'è un errore nel login -->
        <div *ngIf="errorMessage" class="alert alert-danger m-4">
          {{ errorMessage }}
        </div>

        <!-- appare solo al login -->
        <div *ngIf="successMessage" class="alert alert-success m-4">
          {{ successMessage }}
        </div>

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn-my btn-block mb-5"
        >
          Login
        </button>
      </form>
    </div>
  `,
  styles: `
  .container-login {
    border: 2px solid white;
    border-radius: 10px;
    background: rgb(145, 20, 163);
    background: radial-gradient(circle, rgba(145, 20, 163, 1) 0%, rgba(223, 148, 233, 1) 100%);
  }`,
})
export class LoginComponent {
  user: User = {
    username: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.apiService.login(this.user).subscribe(
        response => {
          console.log(response);
          if (response && response.token && response.refreshToken && response.expiredToken && response.expiredRefreshToken) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('expiredToken', response.expiredToken);
            localStorage.setItem('expiredRefreshToken', response.expiredRefreshToken);

            this.successMessage = 'Ciao Bentornato!';
            this.errorMessage = '';
            this.router.navigate(['/protected-route']);
          } else {
            this.errorMessage = 'Login fallito. Riprova.';
            this.successMessage = '';
          }
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Nome utente o password errati. Riprova.';
          this.successMessage = '';
        }
      );
    }
  }
}
