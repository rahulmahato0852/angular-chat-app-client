import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { userStateType } from '../../store/reducers/user.reducer';
import { getAllUsers } from '../../store/actions/user.action';
import { MessagesType, User } from '../../types/user';
import { verifyOtpResponse } from '../../auth/types/response';
import { authStateType } from '../../store/reducers/auth.reducer';
import { chatStateType } from '../../store/reducers/chat.reducer';
import { getMessage, setSelectedUser } from '../../store/actions/chat.action';
import { logOut } from '../../store/actions/auth.action';
import { Socket, io } from 'socket.io-client';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('childRef') childRef?: ElementRef;


  ImgUrl = 'https://angular-chat-app.onrender.com/profiles/'
  // ImgUrl = 'http://localhost:5000/profiles/'

  // socket: Socket = io('http://localhost:5000')
  socket: Socket = io('https://angular-chat-app.onrender.com')

  hovered: boolean = false
  inx: number = -1
  allUsers: User[] = []
  selectedUser: User | null = null
  user: verifyOtpResponse | undefined = undefined
  loading: boolean = false
  ONLINE_USERS: { sid: string, uid: string }[] = []

  constructor(
    private store: Store<{ userReducer: userStateType }>,
    private authstore: Store<{ authReducer: authStateType }>,
    private chatstore: Store<{ chatReducer: chatStateType }>,
    private userstore: Store<{ userReducer: userStateType }>,
    private cd: ChangeDetectorRef,
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedUser"]) {
      console.log('selected user changes');
    }
    if (changes["childRef"]) {
      console.log('childref changed');
    }

  }







  ngOnInit() {

    this.socket.on("connect", () => {
      this.socket.emit("join-app", this.user)
    })
    this.socket.on("Online-res", (data) => {
      console.log(data);
      this.ONLINE_USERS = data
    })

    this.store.dispatch(getAllUsers())
    this.store.select(state => state.userReducer.allusers).subscribe((data) => {
      this.allUsers = data;
    })
    this.authstore.select(state => state.authReducer.user).subscribe((data) => {
      this.user = data;
    })
    this.chatstore.select(state => state.chatReducer.selectedUser).subscribe((data) => {
      this.selectedUser = data
    })
    this.userstore.select(state => state.userReducer.loading).subscribe((data) => {
      this.loading = data
    })
    this.chatstore.select(state => state.chatReducer.getMessageSuccess).subscribe((data) => {
      if (data) {
        console.log('new scroll called');
        this.scrollToBottom()
      }
    })

  }

  ngOnDestroy() {
    console.log("call");
    this.socket.close()
  }



  setSelectedStore(user: User) {
    this.chatstore.dispatch(setSelectedUser({ user }))
    this.chatstore.dispatch(getMessage({ recevier: this.selectedUser?._id || "" }))
    this.cd.detectChanges()
  }

  isOnline(userId: string): boolean {
    return this.ONLINE_USERS.some(s => s.uid.includes(userId));
  }


  logOutUser() {
    this.store.dispatch(logOut())
  }


  scrollToBottom(): void {
    if (this.childRef) {
      this.childRef.nativeElement.scrollTop = this.childRef.nativeElement.scrollHeight;
    }
  }

}
