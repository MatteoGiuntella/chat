import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router per la navigazione

@Component({
  selector: 'app-protected',
  template: `
    <h2>Benvenuto nel tuo profilo!</h2>
    <p>Protected-component works!</p>
    <button (click)="goToSearch()" class="btn btn-primary">Cerca Utenti</button>
    <button (click)="goToFriendsChat()" class="btn btn-secondary">Amici Stretti</button>
  `,
  styles: []
})
export class ProtectedComponent {
  constructor(private router: Router) {}

  goToSearch() {
    this.router.navigate(['/search']); 
  }

  goToFriendsChat() {
    this.router.navigate(['/friends-chat']); 
  }
}
