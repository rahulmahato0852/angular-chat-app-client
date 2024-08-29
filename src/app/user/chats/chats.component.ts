import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { chatStateType } from '../../store/reducers/chat.reducer';
import { MessagesType, User } from '../../types/user';
import { Socket } from 'socket.io-client';
import { getNewMessage } from '../../store/actions/chat.action';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  @Input() scrollBottom: null | Function = null
  @Input() socket: Socket | null = null
  @Input() selectedUser: User | null = null
  allmessages: MessagesType[] = []
  loading: boolean = false
  sendloading: boolean = false
  constructor(private chatStore: Store<{ chatReducer: chatStateType }>) { }




  ngOnInit() {
    this.socket?.on('send-response', (data: MessagesType) => {
      if (data.sender?._id === this.selectedUser?._id) {
        this.chatStore.dispatch(getNewMessage({ newMSG: data }))
      }
    })

    this.chatStore.select(state => state.chatReducer.allMessages).subscribe((data) => {
      this.allmessages = data
    })
    this.chatStore.select(state => state.chatReducer.loading).subscribe((data) => {
      this.loading = data
    })
    this.chatStore.select(state => state.chatReducer.sendloading).subscribe((data) => {
      this.sendloading = data
    })

  }






}
