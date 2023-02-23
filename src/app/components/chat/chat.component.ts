import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { delay, lastValueFrom, Observable } from 'rxjs';
import { Messages } from 'src/app/Messages';
import { ChatService } from 'src/app/services/chat.service';
import { io, Socket } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
interface ChatMessage {
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  messages: Messages[] = [
    { name: 'ChatGPT', content: 'Hello, how can i help you?' },
  ];
  data: any;
  content: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private chatService: ChatService
  ) {}

  async onSubmit() {
    this.messages.push({ name: 'Me', content: this.content });
    console.log(this.content);
    this.chatService.postQuestion(this.content);
    delay(1000);
    await lastValueFrom(this.chatService.getAnswer());
    await lastValueFrom(this.chatService.getAnswer()).then(
      (data) => (this.data = data)
    );
    this.data = this.data.data;
    this.messages.push({ name: 'ChatGPT', content: this.data });

    console.log(this.data);
  }

  onUpdate(event: any) {
    this.content = event.value;
  }
  onPost() {
    this.chatService.postQuestion(this.content);
  }
  //   socket: Socket = io('http://localhost:5000');
  //   messages$: Observable<ChatMessage[]> | undefined;
  //   message: string | undefined;

  //   ngOnInit() {
  //     this.socket = io('http://localhost:5000');
  //     this.messages$ = new Observable((observer) => {
  //       this.socket.on('response', (data: ChatMessage[] | undefined) => {
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   sendMessage() {
  //     if (!this.message) {
  //       return;
  //     }
  //     this.socket.emit('message', { message: this.message });
  //     this.message = '';
  //   }
}
