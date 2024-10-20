import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  template: `
    <div class="chat-overlay" (click)="close()">
      <div class="chat-box" (click)="$event.stopPropagation()">
        <div class="chat-header">
          <h3>Chat con {{ friend.nickname || friend.username }}</h3>
          <button class="close-button" (click)="close()">×</button>
        </div>
        <div class="chat-messages">
          <div *ngFor="let msg of messages">
            <strong>{{ msg.user }}:</strong> {{ msg.text }}
          </div>
        </div>
        <div class="chat-input">
          <input [(ngModel)]="message" placeholder="Scrivi un messaggio..." />
          <button (click)="sendMessage()">Invia</button>
        </div>
      </div>
    </div>
  `,
  styles: `.chat-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Assicurati che sia sopra gli altri elementi */
  }
  
  .chat-box {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .chat-header {
    background: #007bff;
    color: white;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .chat-messages {
    padding: 10px;
    overflow-y: auto;
    flex: 1;
    max-height: 60vh; /* Limita l'altezza del box messaggi */
  }
  
  .chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #e0e0e0;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  
  .close-button {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  `,
})
export class ChatComponent {
  @Input() friend: any; // L'amico con cui si sta chattando
  @Output() closeChat = new EventEmitter<void>(); // Evento per chiudere la chat

  message: string = '';
  messages: { user: string; text: string }[] = []; // Lista dei messaggi

  sendMessage() {
    if (this.message.trim()) {
      this.messages.push({ user: 'Me', text: this.message });
      this.message = ''; // Resetta il campo di input
    }
  }

  close() {
    this.closeChat.emit(); // Emit il messaggio per chiudere la chat
  }
}
