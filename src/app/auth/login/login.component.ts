import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { authStateType } from '../../store/reducers/auth.reducer';
import { loginUser } from '../../store/actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({})
  loading: boolean = false

  constructor(private fb: FormBuilder, private store: Store<{ authReducer: authStateType }>) {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", [Validators.required]],
    })
    store.select(state => state.authReducer.loading).subscribe((data) => {
      this.loading = data as boolean
    })
  }


  onSubmit() {

    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please Fill All Fields',
        icon: 'error',
        confirmButtonText: 'Cool',
      })
    } else {
      this.store.dispatch(loginUser({ userData: this.loginForm.value }))
    }

  }



}
