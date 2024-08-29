import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASEURL = 'https://angular-chat-app.onrender.com' + '/api/v1/user'
  // BASEURL = 'http://localhost:5000' + '/api/v1/user'
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<{
    message: string, result: User[]
  }> {
    return this.http.get<{ message: string, result: User[] }>(this.BASEURL + "/all-users", {
      withCredentials: true
    })
  }



}
