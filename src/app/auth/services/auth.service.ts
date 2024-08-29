import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, loginData, verifyOtpData, verifyOtpResponse } from '../types/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASEURL = 'https://angular-chat-app.onrender.com' + '/api/v1/auth'
  // BASEURL = 'http://localhost:5000' + '/api/v1/auth'
  constructor(private http: HttpClient) { }

  registerUser(userData: FormData): Observable<Response> {
    return this.http.post<Response>(this.BASEURL + "/register", userData)
  }

  loginUser(loginData: loginData): Observable<Response> {
    return this.http.post<Response>(this.BASEURL + "/login", loginData)
  }

  verifyOtp(verifyOtpData: verifyOtpData): Observable<{ result: verifyOtpResponse, message: string }> {
    return this.http.post<{ result: verifyOtpResponse, message: string }>(this.BASEURL + "/verify-otp", verifyOtpData, {
      withCredentials: true
    });
  }


  logOut(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.BASEURL + "/logOut", "ss", { withCredentials: true })
  }








}
