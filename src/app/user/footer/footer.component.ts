import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { chatStateType } from '../../store/reducers/chat.reducer';
import { sendMessage } from '../../store/actions/chat.action';
import { User } from '../../types/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() scrollBottom: null | Function = null

  selectedUser: User | null = null

  constructor(private chatStore: Store<{ chatReducer: chatStateType }>) { }

  ngOnInit() {
    this.chatStore.select(state => state.chatReducer.selectedUser).subscribe((data) => {
      this.selectedUser = data
    })
  }

  onsubmit(arg: NgForm) {
    this.chatStore.dispatch(sendMessage({ message: arg.value.message, recevier: this.selectedUser?._id || "" }))
    arg.resetForm()
    if (this.scrollBottom) {
      this.scrollBottom()
    }
  }



}
