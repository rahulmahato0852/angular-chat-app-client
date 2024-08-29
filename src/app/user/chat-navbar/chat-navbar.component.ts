import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { authStateType } from '../../store/reducers/auth.reducer';
import { verifyOtpResponse } from '../../auth/types/response';
import { chatStateType } from '../../store/reducers/chat.reducer';
import { User } from '../../types/user';

@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.css'
})
export class ChatNavbarComponent {

  @Input() ImgUrl = ''
  user: verifyOtpResponse | undefined = undefined
  selectedUser: User | null = null
  constructor(
    private store: Store<{ authReducer: authStateType }>,
    private chatstore: Store<{ chatReducer: chatStateType }>,
  ) { }


  ngOnInit() {
    this.store.select(state => state.authReducer.user).subscribe((data) => {
      this.user = data
    })
    this.chatstore.select(state => state.chatReducer.selectedUser).subscribe((data) => {
      this.selectedUser = data
    })
  }





}
