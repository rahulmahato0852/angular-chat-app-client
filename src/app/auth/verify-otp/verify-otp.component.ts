import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authStateType } from '../../store/reducers/auth.reducer';
import { verifyOtp } from '../../store/actions/auth.action';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

  userName: string = ''
  constructor(private store: Store<{ authReducer: authStateType }>) {
    store.select(state => state.authReducer.userName).subscribe((data) => {
      this.userName = data;
    })
  }

  onSubmit(arg: NgForm) {
    this.store.dispatch(verifyOtp({ userData: { otp: parseInt(arg.value.otp), userName: this.userName } }))
  }


}
