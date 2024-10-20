import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private friends: any[] = []; 

  constructor() {
    // Carica gli amici esistenti da localStorage
    const storedFriends = localStorage.getItem('friends');
    this.friends = storedFriends ? JSON.parse(storedFriends) : [];
  }

  searchUsers(query: string) {
    // Devo sostituirlo con una chiamata API)
    const allUsers = [
      { username: 'john_doe' },
      { username: 'jane_doe' },
      { username: 'alice' },
      { username: 'bob' }
    ];
    return allUsers.filter(user => user.username.includes(query));
  }

  addFriend(user: any) {
    // Controlla se l'utente è già nella lista degli amici
    if (!this.friends.find(friend => friend.username === user.username)) {
      this.friends.push(user);
      this.saveFriends();
    }
  }

  saveFriends() {
    localStorage.setItem('friends', JSON.stringify(this.friends));
  }

  getFriends() {
    return this.friends;
  }

  changeNickname(username: string, newNickname: string) {
    const friend = this.friends.find(f => f.username === username);
    if (friend) {
      friend.nickname = newNickname; // Cambia il nickname
      this.saveFriends();
    }
  }
}
