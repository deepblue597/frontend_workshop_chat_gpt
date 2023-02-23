import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  answer!: JSON;
  constructor(private http: HttpClient) {}

  getAnswer(): Observable<JSON> {
    return this.http.get<JSON>('http://127.0.0.1:5000/data');
  }
  postQuestion(question: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    this.http
      .post(
        'http://127.0.0.1:5000/post',
        { body: question },
        { headers: headers }
      )
      .subscribe();
    delay(1000);
    console.log('POST');
  }
}
