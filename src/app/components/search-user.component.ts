import { Component } from '@angular/core';
import { UserService } from '../services/userservice.service';

@Component({
  selector: 'app-search-user',
  template: `
    <h2>Cerca Utenti</h2>
    <input [(ngModel)]="searchQuery" placeholder="Inserisci username" class="form-control" />
    <!-- <button (click)="searchUser()" class="btn btn-primary">Cerca</button> -->

    <div *ngIf="users.length">
      <h3>Risultati della ricerca:</h3>
      <ul>
        <li *ngFor="let user of users">
          {{ user.username }}
          <button (click)="addFriend(user)" class="btn btn-success">Aggiungi a Amici Stretti</button>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class SearchUserComponent {
  searchQuery: string = '';
  users: any[] = []; 

  constructor(private userService: UserService) {}

  // searchUser() {
  //    Implementa la logica per cercare gli utenti
  //    this.userService.searchUsers(this.searchQuery).subscribe((results: any[]) => {
  //      this.users = results;
  //   });
  // } CHIEDERE PERCHè NON FUNZIONA IL SUBSCRIBE

  addFriend(user: any) {
    this.userService.addFriend(user); 
  }
}
