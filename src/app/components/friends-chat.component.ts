import { Component } from '@angular/core';
import { UserService } from '../services/userservice.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-friends-chat',
  template: `
    <h2>Amici Stretti</h2>
    <ul>
      <li *ngFor="let friend of friends">
        {{ friend.nickname || friend.username }} 
        <button (click)="chatWith(friend)" class="btn btn-info">Chatta</button>
      </li>
    </ul>
    <app-chat *ngIf="selectedFriend" [friend]="selectedFriend" (closeChat)="closeChat()"></app-chat>
  `,
  styles: []
})
export class FriendsChatComponent {
  friends: any[] = [];
  selectedFriend: any; // Amico selezionato per la chat

  constructor(private userService: UserService) {
    this.friends = this.userService.getFriends();
  }

  chatWith(friend: any) {
    this.selectedFriend = friend; // Seleziona l'amico per la chat
  }

  closeChat() {
    this.selectedFriend = null; // Chiudi la chat
  }
}
