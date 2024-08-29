import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, getMessagesReponse } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // BASEURL = 'http://localhost:5000' + '/api/v1/chat'
  BASEURL = 'https://angular-chat-app.onrender.com' + '/api/v1/chat'
  constructor(private http: HttpClient) { }


  sendMessage(arg: { message: string, recevier: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.BASEURL + "/send-message", arg, {
      withCredentials: true
    })
  }

  getMessages(recevier: string): Observable<getMessagesReponse> {
    return this.http.get<getMessagesReponse>(this.BASEURL + "/get-message/" + recevier, {
      withCredentials: true
    })
  }



}
